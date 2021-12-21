import { MessageEmbed } from "discord.js";

const getPongEmbed = (): MessageEmbed => {
  return new MessageEmbed()
    .setColor("#FFFFFF")
    .setTitle("PONG")
    .setDescription("PONG")
    .setTimestamp();
};

export {
  getPongEmbed
};
