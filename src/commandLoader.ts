import { Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

export default () => {
    const commands = new Collection<String, Function>();

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts')); // note to self: possibly change to js

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        commands.set(command.data.name, command.execute);
    }

    return commands;
};
