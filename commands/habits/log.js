const User = require('../../database/models/userSchema');
const Habs = require('../../database/models/habsSchema');
const { reply } = require("../../lib");

module.exports = {
	name: 'log',
	description: 'Logs the preset point values of the provided emoji(s).',
  category: "Habits",
  hCmd: true,
  args: true,
  usage: "[emoji spam]",
	async execute(message, args, client) {
    var cemojis = args.join(" ").split(":"); 
    var emojis = await Habs.find({});
    var pointsAdd = 0;

    if (cemojis.length > 0){
      for(const checkEmoji of emojis){
        for(const sentEmoji of cemojis){
          if (sentEmoji == checkEmoji.eName) pointsAdd += checkEmoji.eValue;
        }
      }
    }
    
    if(pointsAdd !== 0){
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return message.reply(`you need to make a profile! \`${client.prefix}create\``);
    try {
      await User.findOneAndUpdate({ userID: message.author.id }, { points: userProfile.points + pointsAdd })
      .then(reply(message,`You now have ${userProfile.points + pointsAdd} points!`));
    } catch (err) {
      console.log(err);
    }
    }
	},
};