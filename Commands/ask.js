const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env['GeminiAPI']
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask-ai")
    .setDescription("Ask Aurora AI a question!")
    .addStringOption((option) =>
      option
      .setName("question")
      .setDescription("Your question")
      .setRequired(true)
    ),
  run: ({ interaction }) => {
    interaction.reply({ content: "Thinking...", flags: MessageFlags.Ephemeral })
    const question = interaction.options.getString("question");
    const prompt = `${question} in under 2000 characters, if the prompt is anything related to Hi, just respond with "Hello!", if not, then reply with anything anything related to it, don't have an opening or closing statement, just reply with the answer, and don't mention anything about the prompt, just reply with the answer,`

    async function generateText() { 
      const result = await model.generateContent({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0, 
        },
      });

      interaction.editReply({ content: result.response.text(), flags: MessageFlags.Ephemeral })
    }
    generateText();
  },
  optinons: {},
}