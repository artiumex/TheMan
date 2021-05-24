const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

module.exports = {
	name: 'farm',
	description: 'Displays your farm',
  category: "Farming",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) mentionedMember = message.member;

    let userProfile = await User.findOne({ userID: mentionedMember.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);
    
    const now = Date.now();
    var text = `\`${client.prefix}harvest [type]\` to harvest crops\n\`${client.prefix}fertilize [type]\` to reduce a crop's cooldown, requires ${emoji.fertilizer} 1\n`;
    text += `**Crops**\n`;

    text += `${emoji.wheat} Wheat | ${userProfile.wheatPlanted} [${compDates(now, userProfile.wheatHarvest, 2)}]\n`;
    text += `${emoji.carrot} Carrots | ${userProfile.carrotsPlanted} [${compDates(now, userProfile.carrotHarvest, 6)}]\n`;
    text += `${emoji.potato} Potatoes | ${userProfile.potatoesPlanted} [${compDates(now, userProfile.potatoHarvest, 12)}]\n`;

    text += `**Barn**\n${emoji.fertilizer} Fertilizer | ${userProfile.fertilizer}\n`;

    text += `**Silo**\n`
    text += `${emoji.wheat} Wheat | ${userProfile.wheat}\n`;
    text += `${emoji.carrot} Carrots | ${userProfile.carrots}\n`;
    text += `${emoji.potato} Potatoes | ${userProfile.potatoes}\n`;
    

    reply(message,text);
	},
};

function compDates(now, harvest, hours){
  var output = "";
  if (now > (new Date(harvest).getTime() + (hours * 60 * 60 * 1000))) output = "HARVESTABLE";
  else {
    var minutes = Math.floor(((new Date(harvest).getTime() + (hours * 60 * 60 * 1000)) - now) / (1000 * 60)), hours = 0;
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes -= hours * 60;
      }
    if (hours > 0) output += `${hours} hr, `
    output += `${minutes} min`
  }
  return output
}