import { DiscordClient, MongoResultActivationKeys } from "../@types/bot";
import BotConstants from "./utils/bot-constants";

const checkUsersAreStillVerified = async (
  client: DiscordClient
): Promise<void> => {
  console.log("Checking all users are still verified...");
  const usedActivationKeys: MongoResultActivationKeys[] | null =
    await client.activationKeysRepo.findAllUsedKeys();
  if (!usedActivationKeys) return;
  const guild = await client.guilds.fetch(BotConstants.TEST_GUILD_ID);
  for (const actKey of usedActivationKeys) {
    const member = await guild.members.fetch(actKey._id);
    if (!member) {
      // Deactivate
      console.log(`User [${actKey._id}] no longer found. Deactivating server.`);
    }
    if (!member.roles.cache.has(BotConstants.VERIFIED_ROLE_ID)) {
      // Deactivate - set server activated to false, set activation key used to false (or delete?)
      console.log(
        `User [${actKey._id}] no longer has role. Deactivating server.`
      );
    }
  }
};

export { checkUsersAreStillVerified };
