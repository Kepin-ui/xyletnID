const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help Center"),

    async execute(interaction, client) {
        const embed1 = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Help Center")
        .setDescription("**Command List:**")
        .addFields({ name: "```/serviceinfo [ip]```", value: "[ip] di isi dengan ip/hostname yang sudah diberikan oleh seller"})
        .addFields({ name: "```/help```", value: "Get help command"})
        .setTimestamp()

        const embed2 = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Help Center")
        .setDescription("**Customer Service:**\n\n• Discord: DM Seller\n• WhatsApp: https://bit.ly/wa-xyletnid")
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('page1')
            .setLabel('Page 1')
            .setStyle(ButtonStyle.Success),
            
            new ButtonBuilder()
            .setCustomId('page2')
            .setLabel("Page 2")
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({ embeds: [embed1], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                await i.update({embeds: [embed1], components: [button]})
            }
            if (i.customId === 'page2') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                await i.update({embeds: [embed2], components: [button]})
            }
        })
    }

};