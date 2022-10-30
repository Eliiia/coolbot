import { Client, Events, REST, Routes } from 'discord.js';
import { token, devGuildId } from './config';
import fs from 'fs';
import path from 'path';

// Obtain command files themselves
const commands: object[] = [];
const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(`${path.join(__dirname, 'commands')}/${file}`);
    commands.push(command.data.toJSON());
}

// Wait for login (to get clientId)
const client = new Client({ intents: 0 });
client.login(token);

client.once(Events.ClientReady, async (c) => {
    console.log(
        `setting commands for ${c.user.tag} - ID of ${client.user?.id}`,
    );
    const clientId = client.user?.id;

    const rest = new REST({ version: '10' }).setToken(token as string);

    try {
        console.log(`refreshing ${commands.length} commands...`);

        const data = await rest.put(
            // "PUT" will fully refresh
            Routes.applicationGuildCommands(
                clientId as string,
                devGuildId as string,
            ),
            { body: commands },
        );

        console.log(`updated commands!`);
    } catch (error) {
        console.error(error);
    }

    process.exit();
});
