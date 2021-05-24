const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

module.exports = {
	name: 'drink',
	description: 'Makes you drink beer.',
  category: "Pub",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);

    if(userProfile.beer < 1) return reply(message,"you dont have any beer to drink!");
    try {
      await User.findOneAndUpdate({ userID: message.author.id }, { beer: (userProfile.beer - 1) })
      .then(reply(message,`**${userProfile.userName}** drank ${emoji.beer} Beer`));
    } catch (err) {
      console.log(err);
    }
	},
};