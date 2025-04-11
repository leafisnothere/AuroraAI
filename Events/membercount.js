module.exports = (c, client, handler) => {
  client.user.setPresence(Status)
  client.user.setActivity(`as avalible in ${client.guilds.cache.size} Servers!`, { type: ActivityType.Watching });
};