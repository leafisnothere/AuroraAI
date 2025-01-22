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
      .addFields(
        { name: 'This bot', value: `${BOTSourceCode}` },
        { name: 'Opened Resource (For everyone)', value: 'https://github.com/leafisnothere/AuroraAI' },
      )
      .setFooter({ text: '© 2025 Aurora Group - All rights reserved' })
      .setImage('https://cdn.discordapp.com/attachments/1329085784644386846/1331656158305583165/AuroraCore_Designs_20250122_230601_0000.png?ex=679268f1&is=67911771&hm=2ad37e72e80b740dcb8c84f9d77ca1d399de770cdda0f6a02e95fa668e330d2e&')
    interaction.reply({ embeds: [SourceCode], flags: MessageFlags.Ephemeral});
  },

  options: {
  },
};