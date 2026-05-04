import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

client.once(Events.ClientReady, () => {
    console.log(` Bot logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.on("messageCreate", (message) => {
    console.log(message);

    if(message.author.bot) return;

    message.reply("Hello World!");
})

client.login(process.env.DISCORD_TOKEN);