module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
  category: "Utility",
	usage: '[command name]',
	execute(message, args, client) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
      var categories = [];

      for(const i of commands) {
        if(!categories.includes(i[1].category)) categories.push(i[1].category);
      }

      var outText = "Here\'s a list of all my commands:\n";
      for(const j of categories){
        var sorted = [];
        outText += `**${j}**: `
        for(const i of commands){
          if(i[1].category == j) sorted.push(i);
        }
        outText += `${sorted.map(cmd => cmd[1].name).join(', ')}\n`;
      }
      outText += `\nYou can send \`${client.prefix}help [command name]\` to get info on a specific command!`;

      return message.channel.send(outText);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${client.prefix}${command.name} ${command.usage}`);

		message.channel.send(data, { split: true });
	},
};