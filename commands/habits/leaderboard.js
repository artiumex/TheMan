const mongoose = require('mongoose');
const User = require('../../database/models/userSchema');

module.exports = {
	name: 'leaderboard',
	description: 'Generates a leaderboard.',
  category: "Habits",
	async execute(message, args, client) {
    const lb = await User.find({}).sort({ points: 1 });
    if(!lb.length > 0) return message.reply(`there are no profiles!`);
    
    var text = "";
    lb.map((e, i) => {
      text += `${i+1}. ${e.userName} with ${e.points} points.\n`;
    });

    message.channel.send(text);
	},
};