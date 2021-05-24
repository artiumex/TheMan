const User = require('../../database/models/userSchema');

module.exports = {
	name: 'delete',
	description: 'Removes your character.',
  category: "Habits",
  hCmd: true,
  args: true,
  ownerOnly: true,
  usage: "[name]",
	async execute(message, args, client) {
    let username = args[0].toLowerCase();

    let profile = await User.findOne({ userName: username });

    if (!profile) return message.reply(`**${username}** does not exist!`);
    try {
      await User.findOneAndDelete({ userName: username })
      .then(message.reply(`deleted the profile, **${username}**`));
    } catch (err) {
      console.log(err);
    }
	},
};