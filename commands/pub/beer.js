const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

module.exports = {
	name: 'beer',
	description: 'Returns the amount of beer of yourself or the person mentioned',
  category: "Pub",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) mentionedMember = message.member;

    let userProfile = await User.findOne({ userID: mentionedMember.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);
    
    reply(message,`${mentionedMember} has ${emoji.beer} ${userProfile.beer}.`);
	},
};