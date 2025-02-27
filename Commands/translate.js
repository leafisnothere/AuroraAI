const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env['GeminiAPI']
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate to another language (Powered by Google Translate)")
    .addStringOption((option) =>
      option
      .setName("Content")
      .setDescription("Your content to translate")
      .setRequired(true)
    ),
    .addStringOption((option) =>
      option
      .setName("Launguage")
      .setDescription("Launguge that you want to translate to")
      .setRequired(true)
    ),
  run: ({ interaction }) => {
    interaction.reply({ content: "Thinking...", flags: MessageFlags.Ephemeral })
  
    const context = interaction.options.getString("question");
    const language = interaction.options.getString("language");
    
    const prompt = `Translate "${context}" into ${language} than summarize it in under 1024 characters, don't have an opening or closing statement, just reply with the answer, and don't mention anything about the prompt, just reply with the answer,`

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