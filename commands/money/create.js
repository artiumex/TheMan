const User = require('../../database/models/userSchema');
const mongoose = require('mongoose');

module.exports = {
	name: 'create',
	description: 'Registers your character.',
  category: "Money",
  args: true,
  usage: "[name]",
	async execute(message, args, client) {
    let username = args[0].toLowerCase();

    let profile = await User.findOne({
      userID: message.author.id
    });

    if (!profile) profile = await new User({
      _id: mongoose.Types.ObjectId(),
      userName: username,
      userID: message.author.id,
      color: Math.floor(Math.random() * 16777215),
    });
    else return message.reply('you already have a profile!');
    
    try {
      await profile.save()
      .then(message.reply(`made your profile, ${username}`));
    } catch (err) {
      console.log(err);
    }
	},
};