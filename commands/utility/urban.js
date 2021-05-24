const querystring = require('querystring');
const fetch = require('node-fetch');
const { randColor } = require("../../lib");

module.exports = {
	name: 'urban',
	description: 'Asks urban dictionary to find a definition.',
  category: "Utility",
	args: true,
	aliases: ['define'],
	usage: '[args]',
	execute(message, args) {
		urban(message,args);
	}
}

async function urban(message,args){
	const query = querystring.stringify({ term: args.join(' ') });

	const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
			
	if (!list.length) {
		return message.channel.send(`No results found for **${args.join(' ')}**.`);
	}

	const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

	const answer = list[0];
	
	const embed = {
    "color": randColor().decimal,
    "title": answer.word,
	"url": answer.permalink,
    "fields": [
		{ name: 'Definition', value: trim(answer.definition, 1024) },
		{ name: 'Example', value: trim(answer.example, 1024) }
	]
  };
	message.channel.send({embed});
}