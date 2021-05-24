module.exports = {
	name: 'ping',
	description: 'Ping!',
  category: "Utility",
	execute(message, args, client) {
		message.channel.send('Pong.');
	},
};