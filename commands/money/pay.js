const User = require('../../database/models/userSchema');
const { reply, chatVars } = require("../../lib");

module.exports = {
	name: 'pay',
	description: 'Pays the person mentioned the specified amount',
  category: "Money",
  args: true,
  usage: "@person [amount]",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) return message.reply('please @ someone to give money to!');

    let userProfile = await User.findOne({ userID: message.author.id });
    let mentionedProfile = await User.findOne({ userID: mentionedMember.id });
    if(!(userProfile || mentionedProfile)) return message.reply(`Profile(s) does not exist!`);
    
    var amount = args[1];
    if(!args[1]) return reply(message,`Please provide an amount!`);
    amount = chatVars(amount,userProfile);

    if(amount > userProfile.balance) return reply(message,`You don't have enough money to do that!`);

    var success = true;
    try {
      await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - amount });
      await User.findOneAndUpdate({ userID: mentionedMember.id }, { balance: userProfile.balance + amount });
    } catch (err) {
      success = false;
      console.log(err);
    }
    if(success) return message.channel.send(`${message.author} successfuly gave ${mentionedMember} \$${amount}`);
	},
};