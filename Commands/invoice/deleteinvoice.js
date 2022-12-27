const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("deleteinvoice")
    .setDescription("DELETE SELECTED INVOICE BY NUMBER")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addStringOption(option => 
        option.setName("invoice")
        .setDescription("Nomor Invoice")
        .setRequired(true)
        ),
    
    async execute(interaction, client, message) {
        const {options} = interaction;

        const id = options.getString("invoice");

        try {
            const dblog = `DELETE FROM ${config.invotable} WHERE invoice = ${id}`
            connection.query(`DELETE FROM ${config.invotable} WHERE invoice = ${id}` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Data has been delete from MYSQL`, ephemeral: true });
                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/deleteinvoice\n**Output: Delete Database** \n\n ```" + dblog + "```")
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
