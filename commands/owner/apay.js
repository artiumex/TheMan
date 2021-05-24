const User = require('../../database/models/userSchema');

module.exports = {
	name: 'apay',
	description: "Adds the amount stated to your balance or the mentioned person's balance",
  category: "Owner",
  args: true,
  ownerOnly: true,
  usage: "@person [amount]",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) mentionedMember = message.member;

    let userProfile = await User.findOne({ userID: mentionedMember.id });
    if(!userProfile) return message.reply(`Profile does not exist! \`${client.prefix}create\``);
    
    let amount = Number(args[1]) || Number(args[0]);
    if(!amount) return message.reply("please provide an amount!");

    try {
      await User.findOneAndUpdate({ userID: mentionedMember.id }, { balance: userProfile.balance + amount })
      .then(message.channel.send(`${mentionedMember} had ${userProfile.balance} and now has ${userProfile.balance + amount}!`));
    } catch(err){
      console.log(err);
    }
	},
};