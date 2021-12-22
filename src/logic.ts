import { DiscordClient, MongoResultActivationKeys } from "../@types/bot";
import BotConstants from "./utils/bot-constants";
const deactivateServer = async (
  serverId: string,
  client: DiscordClient
): Promise<void> => {
  await client.serverSettingsRepo.save(serverId, {
    activated: false,
    areScheduledMessagesOn: false,
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
  const guild = await client.guilds.fetch(BotConstants.TEST_GUILD_ID);
  for (const actKey of usedActivationKeys) {
    const member = await guild.members.fetch(actKey.userId);
    if (!actKey.serverId) continue;
    if (member.id === BotConstants.OWNER_ID) continue;

    if (!member) {
      console.log(
        `User [${actKey.userId}] no longer found. Deactivating server.`
      );
      await deactivateServer(actKey.serverId, client);
      continue;
    }
    if (!member.roles.cache.has(BotConstants.VERIFIED_ROLE_ID)) {
      console.log(
        `User [${actKey.userId}] no longer has role. Deactivating server.`
      );
      await deactivateServer(actKey.serverId, client);
    }
  }
};

export { checkUsersAreStillVerified };
