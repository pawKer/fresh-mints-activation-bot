import { Guild, GuildMember, Interaction } from "discord.js";
import { DiscordClient } from "../../@types/bot";
import BotConstants from "../utils/bot-constants";
const interactionCreateEvent = {
  name: "interactionCreate",
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;
    const client = interaction.client as DiscordClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const member = interaction.member as GuildMember;
    const guild: Guild | null = interaction.guild;

    if (!guild) return;

    if (interaction.channel?.id !== BotConstants.REDEMPTION_CHANNEL_ID) {
      await interaction.reply({
        content: `Command can only be used in the <#${BotConstants.REDEMPTION_CHANNEL_ID}> channel.`,
        ephemeral: true,
      });
      return;
    }

    if (!member.roles.cache.has(BotConstants.VERIFIED_ROLE_ID)) {
      await interaction.reply({
        content: "You don't have permission to execute this command.",
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(`[${guild.id}]`, error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
export default interactionCreateEvent;
