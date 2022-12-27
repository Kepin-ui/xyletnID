const {SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits} = require("discord.js");
const {connection} = require("../../db");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addinvoice")
    .setDescription("ADD INVOICE")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)

    .addStringOption(option => 
        option.setName("invoice")
        .setDescription("Nomor Invoice")
        .setRequired(true)
        )
    .addChannelOption(option => 
        option.setName("produk")
        .setDescription("Produk")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
        )
    .addStringOption(option => 
        option.setName("pembayaran")
        .setDescription("Pembayaran")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("harga")
        .setDescription("Harga")
        .setRequired(true)
        )
    .addUserOption(option => 
        option.setName("penjual")
        .setDescription("Penjual")
        .setRequired(true)
        )
    .addUserOption(option => 
        option.setName("pembeli")
        .setDescription("Pembeli")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("tanggal")
        .setDescription("Tanggal")
        .setRequired(true)
        ),
    
    async execute(interaction, client) {
        const {options} = interaction;

        const invoice = options.getString("invoice");
        const produk = options.getChannel("produk");
        const pembayaran = options.getString("pembayaran");
        const harga = options.getString("harga");
        const penjual = options.getUser("penjual");
        const pembeli = options.getUser("pembeli");
        const tanggal = options.getString("tanggal");

        try {
            const dblog = `INSERT INTO ${config.invotable} (invoice, produk, pembayaran, harga, penjual, pembeli, tanggal) VALUES('${invoice}','${produk}','${pembayaran}','${harga}','${penjual}','${pembeli}','${tanggal}')`
            connection.query(`INSERT INTO ${config.invotable} (invoice, produk, pembayaran, harga, penjual, pembeli, tanggal) VALUES('${invoice}','${produk}','${pembayaran}','${harga}','${penjual}','${pembeli}','${tanggal}')` , (err, connection) => {
                if (err) {
                    console.log(err)
                    interaction.reply({ content: `SOMETHING ERROR ${err}`, ephemeral: true })
                } else {
                    if (connection) {
                        interaction.reply({ content: `Data has been Insert to MYSQL`, ephemeral: true });
                        const embed = new EmbedBuilder()
                        .setColor("White")
                        .setTitle(`INVOICE [#${invoice}]`)
                        .setDescription(`**===================**\nProduk: ${produk}\nPembayaran: ${pembayaran}\nHarga: ${harga}\nPenjual: ${penjual}\nPembeli: ${pembeli}\nTanggal: ${tanggal}\n**===================**\n*TRANSACTION DONE*`);
                        client.channels.cache.get(config.invoice_channel).send({ embeds: [embed] })

                        const logEmbed = new EmbedBuilder()
                        .setTitle("Command Log")
                        .setDescription("/addinvoice\n**Output: Insert Database** \n\n ```" + dblog + "```")
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
