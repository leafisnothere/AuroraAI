const { ApplicationCommandType, MessageFlags } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env['GeminiAPI']
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

module.exports = {
  data: {
    name: 'Translate into English',
    type: ApplicationCommandType.Message,
  },

  run: ({ interaction, client, handler }) => {

    interaction.reply({ content: "Translating...", flags: MessageFlags.Ephemeral })
    const content = interaction.targetMessage.content;
    
    const prompt = `"${content}" translate this into English in under 2000 characters, just keep it to the limit, if it gone over the limit, just reply with a very short (Under 1024 Characters) summarized translation of the prompt`

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

  options: {
  
  },
};
