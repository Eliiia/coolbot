import { Client, Events, GatewayIntentBits } from 'discord.js';

import { token } from './config';
import commandLoader from './commandLoader';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = commandLoader();

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName}`);
        return;
    }

    try {
        command(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'there was an error :c',
            ephemeral: true,
        });
    }
});

client.login(token);
