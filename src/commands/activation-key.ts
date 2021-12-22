import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildMember } from "discord.js";
import { Command, MongoResultActivationKeys } from "../../@types/bot";
import crypto from "crypto";

const serverPingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("activation-key")
    .setDescription("Gets an activation key for the current user."),
  async execute(client, interaction) {
    const member = interaction.member as GuildMember;

    // Try to find existing key
    try {
      const existingKey = (await client.activationKeysRepo.findByUserId(
        member.id
      )) as MongoResultActivationKeys;
      if (existingKey) {
        await interaction.reply({
          content: `Your activation key is \`${existingKey._id}\`.`,
          ephemeral: true,
        });
        return;
      }
    } catch (e) {
      console.log(`[userid: ${member.id}] Error retrieving activation key`, e);
      await interaction.reply({
        content:
          "There was an error retrieving an activation key. Please try again or contact support.",
        ephemeral: true,
      });
      return;
    }

    // If no existing key found, create a new one
    const activationKey = crypto.randomUUID();
    try {
      await client.activationKeysRepo.save(activationKey, {
        userId: member.id,
        used: false,
      });
    } catch (e) {
      console.log(`[userid: ${member.id}] Error creating activation key`, e);
      await interaction.reply({
        content:
          "There was an error creating an activation key. Please try again or contact support.",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `Your activation key is \`${activationKey}\``,
      ephemeral: true,
    });
  },
};
export default serverPingCommand;
