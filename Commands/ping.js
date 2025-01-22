const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: 'ping',
    description: 'Shows the latency of the bot',
  },

  run: ({ interaction, client, handler }) => {
    interaction.reply({ content: `Ping: ${client.ws.ping}ms`, flags: MessageFlags.Ephemeral});
  },

  options: {
  },
};