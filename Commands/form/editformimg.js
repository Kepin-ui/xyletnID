const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("editformimg")
    .setDescription("EDIT FORM IMAGE")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    .addStringOption(option => 
        option.setName("id")
        .setDescription("ID")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("image")
        .setDescription("Image")
        .setRequired(true)
        ),
    
    async execute(interaction, client) {
        const {options} = interaction;

        const id = options.getString("id");
        const name = options.getString("name");
        const image = options.getString("image");

        try {
            const dblog = `UPDATE ${config.formtable} SET image = '${image}' WHERE id = ${id}`
            connection.query(`UPDATE ${config.formtable} SET image = '${image}' WHERE id = ${id};` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Image has been Update to MYSQL`, ephemeral: true });

                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/editformimg\n**Output: Update Database** \n\n ```" + dblog + "```")
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
