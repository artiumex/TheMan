const { MessageEmbed } = require('discord.js');

const color = 6760288;

function randColor() {
	var thecolor = Math.floor(Math.random()*16777215);
	//thecolor = color;
	return {"hex": "#"+thecolor.toString(16), "decimal": thecolor}
}

function reply(message,text){
  const output = new MessageEmbed()
  .setColor(color)
  //.setColor(randColor().decimal)
  .setDescription(text)

  message.channel.send(output);
}

module.exports = { reply, color, randColor };