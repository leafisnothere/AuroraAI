const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env['GeminiAPI']
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
    const prompt = `Summarize ${question} in under 2000 characters, just keep it to the limit, if it gone over the limit, just reply with a very short (Under 1024 Characters) summarized result of the prompt`

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
        tools: [{googleSearch: {}}]
      });

      interaction.editReply({ content: result.response.text(), flags: MessageFlags.Ephemeral });
    }
    generateText();
  },
  optinons: {},
}
