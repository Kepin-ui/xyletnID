const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addform")
    .setDescription("ADD FORM")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    .addStringOption(option => 
        option.setName("id")
        .setDescription("ID")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("name")
        .setDescription("Nama")
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
        const image = "https://cdn.discordapp.com/attachments/869380567383298098/1057136962852622396/service-logo-template-design-vector_20029-568.png"

        try {
            const dblog = `INSERT INTO ${config.formtable} (id, name, color, title, description, image) VALUES('${id}','${name}','${color}','${title}','${description}','${image}')`
            connection.query(`INSERT INTO ${config.formtable} (id, name, color, title, description, image) VALUES('${id}','${name}','${color}','${title}','${description}','${image}')` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Data has been Insert to MYSQL\n\nYou can run this command with:\n/form ${name}\nWith ID: ${id}`, ephemeral: true });

                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/addform\n**Output: Insert Database** \n\n ```" + dblog + "```")
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
