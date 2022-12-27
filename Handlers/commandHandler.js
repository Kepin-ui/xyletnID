function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const { token } = require('../config.json');
    const { REST } = require('@discordjs/rest');
    const table = new ascii().setHeading("Commands", "Status");

    let commandsArray = [];

    const commandsFolder = fs.readdirSync('./Commands');
    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of commandsFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);

            client.commands.set(commandFile.data.name, commandFile);

            commandsArray.push(commandFile.data.toJSON());

            table.addRow(file, "loaded");
            continue;
        }
    }

    const rest = new REST({ version: '10' }).setToken(token);
    client.application.commands.set(commandsArray);

    return console.log(table.toString(), "\n Loaded Commands");
}

module.exports = {loadCommands};