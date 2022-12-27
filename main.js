const { Client, GatewayIntentBits, Partials, Collection, Events, EmbedBuilder } = require("discord.js");

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel} = Partials;

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');
const {loadError} = require('./Handlers/errorHandler');

const client = new Client({
    intents: [
        Guilds,
        GuildMembers,
        GuildMessages,
    ],
    Partials: [
        User,
        Message,
        GuildMember,
        ThreadMember,
    ],
});

client.commands = new Collection();
client.config = require('./config.json');
client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadError(client);
});

/**MODAL STARTS */
/**client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;

    const colors = interaction.fields.getTextInputValue(`color`);
    const titles = interaction.fields.getTextInputValue(`title`);
    const desc = interaction.fields.getTextInputValue(`desc`);
    const images = interaction.fields.getTextInputValue(`image`);

    const embed = new EmbedBuilder()
    .setColor(`${colors}`)
    .setTitle(`${titles}`)
    .setDescription(`${desc}`)
    .setImage(`${images}`)

    if(interaction.customId === 'csembed') {
        await interaction.reply({embeds: [embed]}); 
    }

    console.log(`${colors} ${titles} ${desc} ${images}`)
})
*/
/**MODAL ENDS */