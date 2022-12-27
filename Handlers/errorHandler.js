function loadError(client) {
    const {Client, EmbedBuilder} = require("discord.js");
    const config = require("../config.json");

    /**
     * @param {Client} client
     */

    const Embed = new EmbedBuilder()
    .setColor("Red")
    .setTimestamp()
    .setFooter({text: "Anti Crash System"})
    .setTitle("❌ | Error Encountered")

    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)
        const Channel = client.channels.cache.get(config.log_channel)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Rejection/Catch:\n\n** ```" + reason + "```")
            ]
        })
    })
    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)
        const Channel = client.channels.cache.get(config.log_channel)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Uncaught Exception/Catch:\n\n** ```" + err + "\n\n" + origin.toString + "```")
            ]
        })
    })
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        const Channel = client.channels.cache.get(config.log_channel)
        if (!Channel) return

        Channel.send({
            embeds: [
                Embed
                .setDescription("**Unhandled Rejection/Catch (MONITOR):\n\n** ```" + err + "\n\n" + origin.toString + "```")
            ]
        })
    })
}

module.exports = {loadError};