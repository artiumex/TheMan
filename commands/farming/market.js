const User = require('../../database/models/userSchema');
const emoji = require('../../emoji.json');
const { reply, chatVars } = require("../../lib");

var prices = {
  "wheat": {
    "buy": 200,
    "sell": 20
  },
  "carrot": {
    "buy": 2000,
    "sell": 200
  },
  "potato": {
    "buy": 20000,
    "sell": 2000
  },
  "fertilizer": {
    "buy": 1000
  }
}

module.exports = {
	name: 'market',
	description: 'Displays the market!',
  category: "Farming",
  usage: "<id> <amount>",
	async execute(message, args, client) {
    let userProfile = await User.findOne({ userID: message.author.id });
    if(!userProfile) return reply(message,`Profile does not exist! \`${client.prefix}create\``);

		if (!args.length) {
      var text = `\`${client.prefix}market <id> <amount>\` to buy an item (the id is the number next to the item)\n**Farming**\n`;
      text += `[1] ${emoji.wheat} Wheat - Golden grain. Ceres approved. | Price: ${emoji.dollar} ${prices.wheat.buy} \n[2] ${emoji.dollar} ${prices.wheat.sell} - sell wheat\n[3] ${emoji.carrot} Carrots - Plump orange root vegetable. | Price: ${emoji.dollar} ${prices.carrot.buy} \n[4] ${emoji.dollar} ${prices.carrot.sell} - sell carrots\n[5] ${emoji.potato} Potatoes - Amazingly viable lumpy tubers | Price: ${emoji.dollar} ${prices.potato.buy} \n[6] ${emoji.dollar} ${prices.potato.sell} - sell potatoes\n[7] ${emoji.fertilizer} Fertilizer - Halves the time your crops need to get ready | Price: ${emoji.dollar} ${prices.fertilizer.buy}`
      return reply(message,text);
    }

    var number = args[0];
    var amount = args[1];
    if(!amount) amount = 1;
    else amount = chatVars(amount,userProfile);

    if (["1","3","5"].includes(number)){
      if(number == "1"){
        var cost = prices.wheat.buy * amount;
        if (cost > userProfile.balance) return reply(message,"You don't have enough money to buy that!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - cost, wheatPlanted: userProfile.wheatPlanted + amount })
          .then(reply(message,`You now have \$${userProfile.balance - cost}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "3"){
        var cost = prices.carrot.buy * amount;
        if (cost > userProfile.balance) return reply(message,"You don't have enough money to buy that!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - cost, carrotsPlanted: userProfile.carrotsPlanted + amount })
          .then(reply(message,`You now have \$${userProfile.balance - cost}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "5"){
        var cost = prices.potato.buy * amount;
        if (cost > userProfile.balance) return reply(message,"You don't have enough money to buy that!");
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - cost, potatoesPlanted: userProfile.potatoesPlanted + amount })
          .then(reply(message,`You now have \$${userProfile.balance - cost}!`));
        } catch (err) {
          console.log(err);
        }
      }
    }else if (["2","4","6"].includes(number)){
      var balAdd = 0;
      if(number == "2"){
        if(amount > userProfile.wheat) return reply(message,"You don't have enough wheat!");
        balAdd = prices.wheat.sell * amount;
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance + balAdd, wheat: userProfile.wheat - amount })
          .then(reply(message,`You now have \$${userProfile.balance + balAdd}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "4"){
        if(amount > userProfile.carrots) return reply(message,"You don't have enough carrots!");
        balAdd = prices.carrot.sell * amount;
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance + balAdd, carrots: userProfile.carrots - amount })
          .then(reply(message,`You now have \$${userProfile.balance + balAdd}!`));
        } catch (err) {
          console.log(err);
        }
      }
      if(number == "6"){
        if(amount > userProfile.potatoes) return reply(message,"You don't have enough potatoes!");
        balAdd = prices.potato.sell * amount;
        try {
          await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance + balAdd, potatoes: userProfile.potatoes - amount })
          .then(reply(message,`You now have \$${userProfile.balance + balAdd}!`));
        } catch (err) {
          console.log(err);
        }
      }
    } else if(number == 7){
      var cost = prices.fertilizer.buy * amount;
      if (cost > userProfile.balance) return reply(message,"You don't have enough money to buy that!");
      try {
        await User.findOneAndUpdate({ userID: message.author.id }, { balance: userProfile.balance - cost, fertilizer: userProfile.fertilizer + amount })
        .then(reply(message,`You now have \$${userProfile.balance - cost}!`));
      } catch (err) {
        console.log(err);
      }
    }else return reply(message,"Invalid id!");
	},
};