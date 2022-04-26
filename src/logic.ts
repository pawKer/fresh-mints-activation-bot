import { DiscordClient, MongoResultActivationKeys } from "../@types/bot";
import BotConstants from "./utils/bot-constants";
const deactivateServer = async (
  actKey: MongoResultActivationKeys,
  client: DiscordClient
): Promise<void> => {
  if (!actKey.serverId) return;
  await client.serverSettingsRepo.save(actKey.serverId, {
    activated: false,
    areScheduledMessagesOn: false,
  });

  // Setting used to false -> this means the key can be used again
  // but only on one server at a time
  await client.activationKeysRepo.saveAndUpdate(actKey._id, {
    userId: actKey.userId,
    used: false,
  });
};
const checkUsersAreStillVerified = async (
  client: DiscordClient
): Promise<void> => {
  console.log("Checking all users are still verified...");
  const usedActivationKeys: MongoResultActivationKeys[] | null =
    await client.activationKeysRepo.findAllUsedKeys();
  if (!usedActivationKeys) {
    console.log(
      `No used activation keys found or DB call failed. Returning from scheduled job...`
    );
    return;
  }
  const guild = await client.guilds.fetch(BotConstants.GUILD_ID);
  for (const actKey of usedActivationKeys) {
    if (actKey.userId === BotConstants.OWNER_ID) continue;

    let member;
    try {
      member = await guild.members.fetch(actKey.userId);
    } catch (e) {
      // Member is no longer in server
      await handleUserNotInServer(actKey, client);
      continue;
    }

    if (!actKey.serverId) {
      console.error(`[${actKey._id}] Server id not set for activation key`);
      continue;
    }

    if (!member) {
      await handleUserNotInServer(actKey, client);
      continue;
    }

    if (!member.roles.cache.has(BotConstants.VERIFIED_ROLE_ID)) {
      console.log(
        `User [${actKey.userId}] no longer has role. Deactivating server.`
      );
      try {
        await deactivateServer(actKey, client);
      } catch (e) {
        console.error(`Failed to deactivate server ${actKey.serverId}`, e);
      }
    }
  }
};

const handleUserNotInServer = async (
  actKey: MongoResultActivationKeys,
  client: DiscordClient
) => {
  console.log(
    `User [${actKey.userId}] no longer found. Deactivating server: ${actKey.serverId}.`
  );
  try {
    await deactivateServer(actKey, client);
  } catch (e) {
    console.error(`Failed to deactivate server ${actKey.serverId}`, e);
  }
};

export { checkUsersAreStillVerified };
