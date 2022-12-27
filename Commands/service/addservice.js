const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addservice")
    .setDescription("ADD SERVICE INFORMATION")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    .addStringOption(option => 
        option.setName("invoice")
        .setDescription("Nomor Invoice")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("ip")
        .setDescription("IP/HOST")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("username")
        .setDescription("Username")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("expired")
        .setDescription("Expired")
        .setRequired(true)
        ),
    
    async execute(interaction, client, message) {
        const {options} = interaction;

        const invoice = options.getString("invoice");
        const ip = options.getString("ip");
        const username = options.getString("username");
        const expired = options.getString("expired");

        try {
            const dblog = `UPDATE ${config.invotable} SET ip = '${ip}', username = '${username}', expired = '${expired}' WHERE invoice = ${invoice}`
            connection.query(`UPDATE ${config.invotable} SET ip = '${ip}', username = '${username}', expired = '${expired}' WHERE invoice = ${invoice};` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Data has been update to MYSQL`, ephemeral: true });
                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/addservice\n**Output: Update Database** \n\n ```" + dblog + "```")
                        .setTimestamp()
                        .setFooter({text: "Logging System"})
                        client.channels.cache.get(config.log_channel).send({ embeds: [logEmbed] })
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }

    }
}
