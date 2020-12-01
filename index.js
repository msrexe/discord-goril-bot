require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('./db');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if(msg.content.includes('!goril')){
    var data = await db.readFile();
    data = data.split('\n');
    var url = '';
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      if(line.includes(msg.content)){
        console.log(line);
        url = line.split("*")[1];
        break;
      }
    }
    console.log(url);
    if(url.length > 1) {
      msg.reply(url);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
