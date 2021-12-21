import { DiscordClient } from "../../@types/bot";
import { checkUsersAreStillVerified } from "../logic";
import cron from "cron";

const readyEvent = {
  name: "ready",
  once: true,
  async execute(client: DiscordClient) {
    console.log(`Online as ${client?.user?.tag}`);
    client?.user?.setActivity("Candy Crush");
    console.log(`Loaded ${client.commands.size} commands.`);

    const checkUsers = new cron.CronJob("0 * * * *", async () => {
      await checkUsersAreStillVerified(client);
    });
    checkUsers.start();
  },
};
export default readyEvent;
