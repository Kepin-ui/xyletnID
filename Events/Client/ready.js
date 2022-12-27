const {Client, ActivityType, EmbedBuilder} = require('discord.js');
const config = require('../../config.json');
const {connection} = require("../../db");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setActivity("/help | discord.xyletn.my.id", { type: ActivityType.Playing})
        console.log(`${client.user.username} IS NOW ONLINE`);
        connection.connect(function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log(`Connected with Database`)
                const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("Log")
                .setDescription(`**${client.user.username} Is Now Online**\n*Connected with Database*`)
                .setTimestamp()
                .setFooter({text: "Logging System"})
                client.channels.cache.get(config.log_channel).send({ embeds: [embed] })
            }
        })
    },
};