module.exports = {
	name: 'say',
	description: 'Makes the bot say something.',
  category: "Owner",
	args: true,
  ownerOnly: true,
	usage: '[text]',
	execute(message, args) {
		message.delete().catch(console.error);
		message.channel.send(args.join(" "));
	}
}
