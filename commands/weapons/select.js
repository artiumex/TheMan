const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');

module.exports = {
	name: 'select',
	description: 'Changes your weapon.',
  category: "Weapons",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return message.reply(`Profile does not exist! \`${client.prefix}create\``);
		
    var choice = args[0];
    if(!choice) return message.reply("please provide a weapon choice!");

    if(["bow","shotgun","rifle","b","s","r","gun","g"].includes(choice)){
      if (["bow","b"].includes(choice)){
        if(!userProfile.bow) return message.reply(`you dont have a ${emoji.bow} Bow!`);
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { currentWeapon: 0 })
          .then(message.reply(`selected the weapon: ${emoji.bow} Bow!`));
        } catch (err){
          console.log(err);
        }
      }
      if (["shotgun","s","gun","g"].includes(choice)){
        if(!userProfile.gun) return message.reply(`you dont have a ${emoji.gun} Shotgun!`);
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { currentWeapon: 1 })
          .then(message.reply(`selected the weapon: ${emoji.gun} Shotgun!`));
        } catch (err){
          console.log(err);
        }
      }
      if (["rifle","r"].includes(choice)){
        if(!userProfile.rifle) return message.reply(`you dont have a ${emoji.rifle} Rifle!`);
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { currentWeapon: 2 })
          .then(message.reply(`selected the weapon: ${emoji.rifle} Rifle!`));
        } catch (err){
          console.log(err);
        }
      }
    }
	},
};