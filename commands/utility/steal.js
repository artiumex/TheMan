const { Util } = require('discord.js');

module.exports = {
	name: 'steal',
	description: 'Steals emojis from the server your in!',
  category: "Utility",
  args: true,
  usage: '[emoji spam]',
	execute(message, args, client) {
		for(const rawEmoji of args){
      const parsedEmoji = Util.parseEmoji(rawEmoji);

      if(parsedEmoji.id){
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

        message.channel.send(url);
      }
    }
	},
};