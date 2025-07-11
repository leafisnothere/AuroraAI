const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env['GeminiAPI']
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate a message by Aurora AI")
    .addStringOption((option) =>
      option
      .setName("content")
      .setDescription("Content that you want to translate")
      .setRequired(true)
    )
    .addStringOption((option) =>
      option
      .setName("output-launguage")
      .setDescription("Launguage that you want to translate to")
      .setRequired(true)
    ),
  run: ({ interaction }) => {
    interaction.reply({ content: "Translating...", flags: MessageFlags.Ephemeral })
    const Content = interaction.options.getString("content");
    const Outputlaunguage = interaction.options.getString("output-launguage");
    
    const prompt = `Translate the following content, "${Content}" into ${Outputlaunguage} in under 2000 characters, just keep it to the limit, if it gone over the limit, just reply with a very short (Under 1024 Characters) summarized translation of the prompt`

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
