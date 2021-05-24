const mongoose = require('mongoose');
const User = require('../../database/models/userSchema');

module.exports = {
	name: 'reset',
	description: 'Resets the game.',
  category: "Habits",
  hCmd: true,
  ownerOnly: true,
	async execute(message, args, client) {
    const lb = await User.find({}).sort({ points: 1 });
    
    var text = "";  
    lb.map((e, i) => {
      if (i >= 5) return;
      text += `${i+1}. ${e.userName} with ${e.points} points.\n`;
    });

    var winrole = message.guild.roles.cache.find(e => e.name == "Last Week's Winner");
    if (!winrole) return;
    message.guild.members.cache.forEach(async function(member) {
      let userProfile = await User.findOne({ userID: message.author.id });
      if(userProfile) {
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance + userProfile.points });
        } catch (err) {
          console.log(err);
        }
      }

      if(!member.roles.cache.find(t => t.name == 'Last Week\'s Winner')) return;
      member.roles.remove(winrole);
    });

    var winmember = message.guild.members.cache.find(e => e.user.id == lb[0].userID);
    try{
      await winmember.roles.add(winrole);
    } catch(err){
      console.log(err);
      message.reply("Couldn't add the role to the member!")
    }

    try {
      await User.updateMany({}, {points: 0})
      message.channel.send("Reset game!\n\n" + text);
    } catch (err) {
      console.log(err);
      message.reply("Could not reset the game! Awkward!");
    }
	},
};