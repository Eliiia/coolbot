import {
    SlashCommandBuilder,
    CommandInteraction,
    REST,
    Routes,
} from 'discord.js';
import fs from 'fs';

import { token, devGuildId } from '../config';

export const data = new SlashCommandBuilder()
    .setName('register-commands')
    .setDescription('registers my cool af commands');

export async function execute(interaction: CommandInteraction) {
    const clientId = interaction.client.user.id; // get client from interaction

    const commands: object[] = [];
    const commandFiles = fs.readdirSync('./src/commands');

    // gather data about the commands
    for (const file of commandFiles) {
        const command = require(`./${file}`);
        commands.push(command.data.toJSON());
    }

    try {
        const rest = new REST({ version: '10' }).setToken(token as string);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, devGuildId as string),
            { body: commands },
        );

        interaction.reply('updated commands!');
    } catch (error) {
        interaction.reply(
            `unable to update commands - error: \`\`\`${error}\`\`\``,
        );
    }

    console.log(1);
}
