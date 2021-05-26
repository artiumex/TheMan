const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');

//gun steals beer as well?
//rifle steals crops?

module.exports = {
	name: 'shoot',
	description: 'Shoots the mentioned person and loots them',
  category: "Weapons",
  args: true,
  usage: "@person",
	async execute(message, args, client) {
    let mentionedMember = message.mentions.members.first()
    if (!mentionedMember) return message.reply('please @ someone to give money to!');

    let userProfile = await User.findOne({ userID: message.author.id });
    let mentionedProfile = await User.findOne({ userID: mentionedMember.id });
    if(!(userProfile || mentionedProfile)) return message.reply(`Profile(s) does not exist!`);

    var amount, weapon, update;
    const now = Date.now();
    if(userProfile.currentWeapon == 0) {
      if ((new Date(userProfile.bowCooldown).getTime() + (2 * 60 * 60 * 1000)) > now) return message.reply(`That weapon has a 2 hour cooldown! Try again in ${compDates(now, userProfile.bowCooldown, 2)}`);
      amount = Math.floor((Math.random() * mentionedProfile.balance) / 6);
      weapon = `${emoji.bow} Bow`;
      update = { balance: userProfile.balance + amount, bowAmmo: userProfile.bowAmmo - 1, bowCooldown: new Date() };
    }
    if(userProfile.currentWeapon == 1) {
      if ((new Date(userProfile.gunCooldown).getTime() + (6 * 60 * 60 * 1000)) > now) return message.reply(`That weapon has a 6 hour cooldown! Try again in ${compDates(now, userProfile.gunCooldown, 6)}`);
      amount = Math.floor((Math.random() * mentionedProfile.balance) / 4);
      weapon = `${emoji.gun} Shotgun`;
      update = { balance: userProfile.balance + amount, gunAmmo: userProfile.gunAmmo - 1, gunCooldown: new Date() };
    }
    if(userProfile.currentWeapon == 2) {
      if ((new Date(userProfile.rifleCooldown).getTime() + (12 * 60 * 60 * 1000)) > now) return message.reply(`That weapon has a 12 hour cooldown! Try again in ${compDates(now, userProfile.rifleCooldown, 12)}`);
      amount = Math.floor((Math.random() * mentionedProfile.balance) / 3);
      weapon = `${emoji.rifle} Rifle`;
      update = { balance: userProfile.balance + amount, rifleAmmo: userProfile.rifleAmmo - 1, rifleCooldown: new Date() };
    }

    var success = true;
    try {
      await User.findOneAndUpdate({ userID: message.author.id }, update);
      await User.findOneAndUpdate({ userID: mentionedMember.id }, { balance: userProfile.balance - amount });
    } catch (err) {
      success = false;
      console.log(err);
    }
    if(success) return message.channel.send(`${message.author} shot ${mentionedMember} with ${weapon} and stole \$${amount}`);
	},
};

function compDates(now, cooldown, hours){
  var output = "";
  if (now > (new Date(cooldown).getTime() + (hours * 60 * 60 * 1000))) output = "NOW";
  else {
    var minutes = Math.floor(((new Date(cooldown).getTime() + (hours * 60 * 60 * 1000)) - now) / (1000 * 60)), hours = 0;
    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes -= hours * 60;
      }
    if (hours > 0) output += `${hours} hr, `
    output += `${minutes} min`
  }
  return output
}