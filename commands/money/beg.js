const mongoose = require('mongoose');
const User = require('../../database/models/userSchema');
const Habs = require('../../database/models/habsSchema');

module.exports = {
	name: 'beg',
	description: 'Begs for money.',
  category: "Money",
  ownerOnly: true,
  hCmd: true,
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return message.reply(`you need to make a profile! \`${client.prefix}create\``);

    let chance = Math.floor(Math.random() * 100) + 1;
    let rand = Math.floor(Math.random() * 5) + 1;
    var responses = [];

    if(chance < 34||chance == 69){
      responses = [
        `Here's some change, **${userProfile.userName}**`,
      ];
      if (chance = 69){
        responses = ["The random generator rolled a 69. Nice."]
        rand = 420; 
      }
      try {
        await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance + rand });
      } catch (err) {
        console.log(err);
      }
    } else {
      responses = [
        "Get lost, loser!",
        "Beat it, deadbeat!"
      ];
    }

    let r = Math.floor(Math.random() * responses.length)
    message.channel.send(responses[r]);
	},
};