const User = require('../../database/models/userSchema');

module.exports = {
	name: 'test',
	description: 'Test command',
  category: "Money",
  ownerOnly:true,
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return message.reply(`Profile does not exist! \`${client.prefix}create\``);

    let update = { balance: 20000000 };

    await User.findOneAndUpdate({ userID: message.author.id }, update)
	},
};