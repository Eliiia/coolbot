import { config } from 'dotenv';

config();

if (!process.env.TOKEN) new Error('TOKEN not provided.');
export const token = process.env.TOKEN;

if (!process.env.DEVGUILDID) new Error('DEVGUILDID not provided.');
export const devGuildId = process.env.DEVGUILDID;
