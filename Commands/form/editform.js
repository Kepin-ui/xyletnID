const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("editform")
    .setDescription("EDIT FORM")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    .addStringOption(option => 
        option.setName("id")
        .setDescription("ID")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("name")
        .setDescription("Name")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("color")
        .setDescription("Color")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("title")
        .setDescription("Title")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("description")
        .setDescription("Description")
        .setRequired(true)
        ),
    
    async execute(interaction, client) {
        const {options} = interaction;

        const id = options.getString("id");
        const name = options.getString("name");
        const color = options.getString("color");
        const title = options.getString("title");
        const description = options.getString("description");

        try {
            const dblog = `UPDATE ${config.formtable} SET name = '${name}', color = '${color}', title = '${title}', description = '${description}' WHERE id = ${id}`
            connection.query(`UPDATE ${config.formtable} SET name = '${name}', color = '${color}', title = '${title}', description = '${description}' WHERE id = ${id}` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Data has been Update to MYSQL`, ephemeral: true });

                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/editform\n**Output: Update Database** \n\n ```" + dblog + "```")
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
