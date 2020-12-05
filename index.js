require('dotenv').config();
const {Client, MessageEmbed } = require('discord.js');
const { writeFile } = require('./db');
const client = new Client();
const db = require('./db');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  console.log('message sent! => '+msg.content);
  if(msg.content === '!goril help'){
    const embed = new MessageEmbed();
    embed.setTitle('!!Goril Bot Komutları!!');
    embed.setDescription('Just Goriller \n Goril çağırmak için => !goril <çağırmak istediğiniz goril> \n Örn : !goril analiz \n Goril eklemek için => !goril ekle <goril adı> <goril resmi url>');
    msg.channel.send(embed);
  }else if(msg.content.startsWith('!goril ekle')){
    var newGoril = msg.content.substr(11).trim();
    var arr = newGoril.split(" ");
    var newURL = arr[arr.length - 1];
    newGoril = newGoril.replace(newURL,"");
    newGoril = "\n!goril "+newGoril+" * "+newURL;
    db.writeFile(newGoril);
    msg.reply('Yeni goril eklendi !!');
  }else if(msg.content.includes('!goril')){
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
