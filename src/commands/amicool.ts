import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('amicool')
    .setDescription('i will tell u how cool u r');

export async function execute(interaction: CommandInteraction) {
    if (interaction.user.id == '286756561848762378')
        await interaction.reply('extra not cool');
    else if (interaction.user.id != '257482333278437377')
        await interaction.reply('not cool');
    else await interaction.reply('cool');
}
