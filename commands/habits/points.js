const mongoose = require('mongoose');
const User = require('../../database/models/userSchema');
const { reply } = require("../../lib");

module.exports = {
	name: 'points',
	description: 'Returns the points of yourself or the person mentioned',
  category: "Habits",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if(args.length > 0) mentionedMember = await message.guild.members.fetch(args[0]);
    else if (!mentionedMember) mentionedMember = message.member;

    let userProfile = await User.findOne({ userID: mentionedMember.id });
    if(!userProfile) return message.reply(`Profile does not exist! \`${client.prefix}create\``);
    
    reply(message,`${mentionedMember} has ${userProfile.points} points.`);
	},
};