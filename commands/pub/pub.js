const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply } = require("../../lib");

const prices = {
  "license": 1000,
  "beer": 100,
  "bow": 10000,
  "bowammo": 1000,
  "gun": 100000,
  "gunammo": 10000,
  "rifle": 1000000,
  "rifleammo": 100000
}

module.exports = {
	name: 'pub',
	description: 'Displays the pub.',
  category: "Pub",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);

    if(!args.length){    
      var text = "";
      if (!userProfile.barLicense) text += `You dont have a bar license! Buy one for ${emoji.dollar} ${prices.license} with \`${client.prefix}pub 1 1\`\n\n`;
      text += `\`${client.prefix}pub <id> <amount>\` to buy things from the pub\n**Pub**\n`;
      text += `[1] ${isBought(userProfile.barLicense)} ${emoji.license} Bar Membership | Price: ${emoji.dollar} ${prices.license}\n`;
      text += `[2] ${emoji.beer} Beer | Price: ${emoji.dollar} ${prices.beer}\n`;
      text += "**Weapons**\n"
      text += `[3] ${isBought(userProfile.bow)} ${emoji.bow} Bow - Comes with 3 arrows | Price: ${emoji.beer} ${prices.bow}\n`;
      text += `[4] ${emoji.bowammo} Bow Ammo (Arrows) | Price: ${emoji.beer} ${prices.bowammo}\n`;
      text += `[5] ${isBought(userProfile.gun)} ${emoji.gun} Shotgun - comes with 3 bullets | Price: ${emoji.beer} ${prices.gun}\n`;
      text += `[6] ${emoji.gunammo} Gun Ammo (Bullets) | Price: ${emoji.beer} ${prices.gunammo}\n`;
      text += `[7] ${isBought(userProfile.rifle)} ${emoji.rifle} Rifle - comes with 3 bullets | Price: ${emoji.beer} ${prices.bow}\n`;
      text += `[8] ${emoji.rifleammo} Rifle Ammo (Bullets) | Price: ${emoji.beer} ${prices.rifleammo}\n`;

      return reply(message,text);
    }

    var number = args[0];
    var amount = args[1]
    .replace(/allmoney/gi, userProfile.balance.toString())
    .replace(/allwheat/gi, userProfile.wheat.toString())
    .replace(/allcarrot/gi, userProfile.carrot.toString())
    .replace(/allpotato/gi, userProfile.potato.toString())
    .replace(/[^-()\d/*+.]/g, '');
    amount = eval(amount);
    
    if(!amount) return reply(message,`Provide an amount!`);
    if(["1","2","3","4","5","6","7","8"].includes(number)){
      if(number == "1"){
        if(userProfile.barLicense) return reply(message,"You already have a license, you drunkard.");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - prices.license, barLicense: true })
          .then(reply(message,"Bought a license!"));
        } catch (err){
          console.log(err);
        }
      }

      if (!userProfile.barLicense) return;

      if(number == "2"){
        var cost = prices.beer * amount;
        if(cost > userProfile.balance) return reply(message,"You don't have enough money to buy beer!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - cost, beer: userProfile.beer + amount })
          .then(reply(message,`Bought ${emoji.beer} ${amount}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "3"){
        if(userProfile.bow) return reply(message,"You already have a bow!");
        if(prices.bow > userProfile.beer) return reply(message,"You don't have enough beer to buy a bow!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - prices.bow, bow: true })
          .then(reply(message,`Bought ${emoji.bow} 1!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "4"){
        var cost = prices.bowammo * amount;
        if(cost > userProfile.beer) return reply(message,"You don't have enough beer to buy a bow!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - cost, bowAmmo: userProfile.bowAmmo + amount })
          .then(reply(message,`Bought ${emoji.bowammo} ${amount}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "5"){
        if(userProfile.gun) return reply(message,"You already have a gun!");
        if(prices.gun > userProfile.beer) return reply(message,"You don't have enough beer to buy a gun!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - prices.gun, gun: true })
          .then(reply(message,`Bought ${emoji.gun} 1!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "6"){
        var cost = prices.gunammo * amount;
        if(cost > userProfile.beer) return reply(message,"You don't have enough beer to buy a shotgun!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - cost, gunAmmo: userProfile.gunAmmo + amount })
          .then(reply(message,`Bought ${emoji.gunammo} ${amount}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "7"){
        if(userProfile.rifle) return reply(message,"You already have a rifle!");
        if(prices.rifle > userProfile.beer) return reply(message,"You don't have enough beer to buy a rifle!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - prices.rifle, rifle: true })
          .then(reply(message,`Bought ${emoji.rifle} 1!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "8"){
        var cost = prices.rifleammo * amount;
        if(cost > userProfile.beer) return reply(message,"You don't have enough beer to buy a rifle!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { beer: userProfile.beer - cost, rifleAmmo: userProfile.rifleAmmo + amount })
          .then(reply(message,`Bought ${emoji.rifleammo} ${amount}!`));
        } catch (err) {
          console.log(err);
        }
      }
    } else return reply(message,"Invalid ID!");
	},
};

function isBought(item){
  if(item) return `${emoji.bought} **BOUGHT:**`
  else return `${emoji.notbought} **NOT BOUGHT:**`
}