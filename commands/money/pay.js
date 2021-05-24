const User = require('../../database/models/userSchema');

module.exports = {
	name: 'pay',
	description: 'Pays the person mentioned the specified amount',
  category: "Money",
  args: true,
  usage: "@person [amount]",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if(args.length > 0) mentionedMember = await message.guild.members.fetch(args[0]);
    else if (!mentionedMember) return message.reply('please @ someone to give money to!');

    let userProfile = await User.findOne({ userID: message.author.id });
    let mentionedProfile = await User.findOne({ userID: mentionedMember.id });
    if(!(userProfile || mentionedProfile)) return message.reply(`Profile(s) does not exist!`);
    
    var amount = Number(args[1]);
    if(!amount) return message.reply('please specify an amount!');

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