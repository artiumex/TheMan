const mongoose = require('mongoose');
const User = require('../../database/models/userSchema');
const { reply } = require("../../lib");

module.exports = {
	name: 'balance',
	description: 'Returns the balance of yourself or the person mentioned',
  category: "Money",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) mentionedMember = message.member;

    let userProfile = await User.findOne({ userID: mentionedMember.id });
    if(!userProfile) return message.reply(`Profile does not exist! \`${client.prefix}create\``);
    
    reply(message,`${mentionedMember} has \$${userProfile.balance}.`);
	},
};