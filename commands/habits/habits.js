const mongoose = require('mongoose');
const Habs = require('../../database/models/habsSchema');

module.exports = {
	name: 'habits',
	description: 'Deals with the habits.',
  category: "Habits",
  hCmd: true,
  args: true,
  usage: "help",
	async execute(message, args, client) {
    //!habits [add,remove,modify,list,help]
    //...add [emoji name] [value]
    //...remove [emoji name]
    //...modify [name,value] [emoji name] [change]
    var helpStr = `\n\`${client.prefix}habits help\`` 
    if (["add", "remove", "modify", "list", "help"].includes(args[0])){
      if(args[0] == "add"){
        if(!args[1]) return message.reply('please provide an emoji name!');
        if(!args[2]) return message.reply('please provide a point value!');
        if(!(args[2] < 0 || args[2] > 0)) return message.reply('please provide a proper point value!');
        let newHab = await new Habs({
          _id: mongoose.Types.ObjectId(),
          eName: args[1],
          eValue: Number(args[2]),
        });
        try {
          await newHab.save()
          .then(message.reply(`made hab **${args[1]}** with value of ${Number(args[2])}`));
        } catch (err) {
          console.log(err);
        }
      }
      if(args[0] == "remove"){
        if(!args[1]) return message.reply('please provide an emoji name!');
        let hab = await Habs.findOne({ eName: args[1] });
        if(!hab) return message.reply(`Emoji does not exist!`);
        try {
          await Habs.findOneAndDelete({ eName: args[1] })
          .then(message.reply(`deleted hab ${args[1]}`));
        } catch (err) {
          console.log(err);
        }
      }
      if(args[0] == "modify"){
        if(!args[1]) return message.reply('please provide an emoji name!');
        if(["name", "value"].includes(args[1])){
          if(args[1] == "name"){
            if(!args[2]) return message.reply('please provide an emoji name!');
            if(!args[3]) return message.reply('please provide a new name!');
            let hab = await Habs.findOne({ eName: args[2] });
            if(!hab) return message.reply(`Emoji does not exist!`);
            try {
              await Habs.findOneAndUpdate({ eName: args[2] }, { eName: args[3] })
              .then(message.reply(`updated hab ${args[2]} to ${args[3]}`));
            } catch (err) {
              console.log(err);
            }
          }
          if(args[1] == "value"){
            if(!args[2]) return message.reply('please provide an emoji name!');
            if(!args[3]) return message.reply('please provide a new point value!');
            if(!(args[3] < 0 || args[3] > 0)) return message.reply('please provide a proper point value!');
            let hab = await Habs.findOne({ eName: args[2] });
            if(!hab) return message.reply(`Emoji does not exist!`);
            try {
              await Habs.findOneAndUpdate({ eName: args[2] }, { eValue: Number(args[3]) })
              .then(message.reply(`updated hab ${args[2]}: value ${hab.eName} to ${args[3]}`));
            } catch (err) {
              console.log(err);
            }
          }
        } else return message.reply('please provide a proper argument! '+helpStr);
      }
      if(args[0] == "list"){
        const lb = await Habs.find({});
        if(!lb.length > 0) return message.reply(`there are no emojis! Register one with \`${client.prefix}habits add [emoji name] [value]\``);

        var text = "";
        lb.map(e => {
         text += `${e.eName}/${e.eValue}\n`;
        });
        message.channel.send(text).catch();
      }
      if(args[0] == "help") {
        message.reply(`the syntax for the habits command is as follows:\n\`${client.prefix}habits [add,remove,modify,list,help]\`\n\`...add [emoji name] [value]\`\n\`...remove [emoji name]\`\n\`...modify [name,value] [emoji name] [change]\``);
      }
    } else return message.reply('please provide a proper argument! '+helpStr);
	},
};