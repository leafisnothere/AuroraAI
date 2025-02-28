const { MessageFlags, EmbedBuilder, Embed } = require("discord.js");
const BOTSourceCode = process.env['MySourceCode']

module.exports = {
  data: {
    name: 'source-code',
    description: 'Shows source-code and information about this bot',
  },

  run: ({ interaction, client, handler }) => {
    const SourceCode = new EmbedBuilder()
      .setTitle("Source Code")
      .setDescription("This embed will show links to source-codes of this bot and the open-source license and code of this conduct")
      .setColor("004AAD")
      .addFields(
        { name: 'This bot', value: `${BOTSourceCode}` },
        { name: 'Opened Resource (For everyone)', value: 'https://github.com/leafisnothere/AuroraAI' },
      )
      .setFooter({ text: '© 2025 Aurora Group - All rights reserved' })
      .setImage('https://cdn.discordapp.com/attachments/1335978783215194112/1344972931163361430/AuroraCore_Designs_20250227_220321_0000.png?ex=67c2db27&is=67c189a7&hm=5de9dd39e020f5ea4df2fdd7e873ffed935ba1ea62d662290f3d7cf5f432cd27&')
    interaction.reply({ embeds: [SourceCode], flags: MessageFlags.Ephemeral});
  },

  options: {
  },
};