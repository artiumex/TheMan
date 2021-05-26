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

function chatVars(t,profile){
  var output = t
  .replace(/allmoney/gi, profile.balance.toString())
  .replace(/allwheat/gi, profile.wheat.toString())
  .replace(/allcarrot/gi, profile.carrots.toString())
  .replace(/allpotato/gi, profile.potatoes.toString())
  .replace(/[^-()\d/*+.]/g, '');
  
  try{
    output = Math.abs(Math.floor(eval(output)));
  } catch (err){
    console.log(err);
  }
  
  return output
}

module.exports = { reply, color, randColor, chatVars };