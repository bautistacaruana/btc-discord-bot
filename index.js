
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Bot activo como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === '!btc') {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await res.json();
      const price = data.bitcoin.usd;
      message.channel.send(`🟠 El precio actual de BTC es: $${price}`);
    } catch (err) {
      console.error(err);
      message.channel.send('Error al obtener el precio de BTC.');
    }
  }
});

client.login(process.env.TOKEN);
