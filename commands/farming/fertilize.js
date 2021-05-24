const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

module.exports = {
	name: 'fertilize',
	description: 'Halves the harvest time of the selected crop',
  category: "Farming",
  args: true,
  usage: "[crop name]",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);

    if(userProfile.fertilizer < 1) return reply(message,"you dont have any fertilizer!");
    
    const now = Date.now();
    if(["wheat","carrot","potato","w","c","p","carrots","potatoes","potatos"].includes(args[0])){
      if(["wheat","w"].includes(args[0])){
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { fertilizer: userProfile.fertilizer-1, wheatHarvest: halveTime(now, userProfile.wheatHarvest, 2) });
        } catch (err) {
          console.log(err);
        }
      }
      if(["carrot","c","carrots"].includes(args[0])){
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { fertilizer: userProfile.fertilizer-1, carrotHarvest: halveTime(now, userProfile.carrotHarvest, 6) });
        } catch (err) {
          console.log(err);
        }
      }
      if(["potato","p","potatoes","potatos"].includes(args[0])){
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { fertilizer: userProfile.fertilizer-1, potatoHarvest: halveTime(now, userProfile.potatoHarvest, 12) });
        } catch (err) {
          console.log(err);
        }
      }
      reply(message,"Halved the time of your crop!");
    }
	},
};

function halveTime(now, harvest, hours){
  var c =  new Date(harvest).getTime() - (((Number(harvest) + (hours * 60 * 60 * 1000)) - now) / 2)
  return new Date(c)
}