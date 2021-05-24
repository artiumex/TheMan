const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

module.exports = {
	name: 'harvest',
	description: 'Harvests your crops',
  category: "Farming",
  args: true,
  usage: "[crop name]",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);
    
    const now = Date.now();
    if(["wheat","carrot","potato","w","c","p","carrots","potatoes","potatos"].includes(args[0])){
      if(["wheat","w"].includes(args[0])){
        if ((new Date(userProfile.wheatHarvest).getTime() + (2 * 60 * 60 * 1000)) > now) return reply(message,"That crop is not ready!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { wheat: userProfile.wheat + (userProfile.wheatPlanted * 3), wheatHarvest: new Date() })
          .then(reply(message,`Successfully harvested ${emoji.wheat} Wheat!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(["carrot","c","carrots"].includes(args[0])){
        if ((new Date(userProfile.carrotHarvest).getTime() + (6 * 60 * 60 * 1000)) > now) return reply(message,"That crop is not ready!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { carrots: userProfile.carrots + (userProfile.carrotsPlanted * 3), carrotHarvest: new Date() })
          .then(reply(message,`Successfully harvested ${emoji.carrot} Carrot!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(["potato","p","potatoes","potatos"].includes(args[0])){
        if ((new Date(userProfile.potatoHarvest).getTime() + (12 * 60 * 60 * 1000)) > now) return reply(message,"That crop is not ready!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { potatoes: userProfile.potatoes + (userProfile.potatoesPlanted * 3), potatoHarvest: new Date() })
          .then(reply(message,`Successfully harvested ${emoji.potato} Potato!`));
        } catch (err) {
          console.log(err);
        }
      }
    }
	},
};