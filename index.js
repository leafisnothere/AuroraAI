const { Client, IntentsBitField, PresenceUpdateStatus, Collection, Status, ActivityType } = require("discord.js")
const { CommandKit } = require("commandkit")

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ]
})

new CommandKit({
  client,
  commandsPath: `${__dirname}/Commands`,
})



client.login(process.env.DiscordBOT);

client.on('ready', (C) => {
  console.log(`Bot is ready, logged in as ${C.user.username}`)
  client.user.setStatus(PresenceUpdateStatus.Online);
  client.user.setPresence(Status)
  client.user.setActivity(`as avalible in ${client.guilds.cache.size} Servers!`, { type: ActivityType.Watching });
})
