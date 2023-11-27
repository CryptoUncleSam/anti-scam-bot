import {Client, GatewayIntentBits} from 'discord.js'
import dotenv from "dotenv";
import { channelsID } from './excludeChannels';

dotenv.config();


// Initialize discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Login into discord bot
export const initDiscord = async () => {
    client.on('ready', async () => {
      console.log(`Discord logged in as ${client.user?.tag}`)
    })
    await client.login(process.env.DISCORD_TOKEN)
  
    return client
}

initDiscord()

client.on('messageCreate', message => {
    if(message.embeds.length > 0 && !channelsID.includes(message.channelId) ){
        message.delete();
        message.channel.send(`Ban this user ${message.author.id}`);
    }
});





