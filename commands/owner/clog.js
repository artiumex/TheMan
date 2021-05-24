module.exports = {
	name: 'clog',
	description: 'Logs arguments to the console!',
  category: "Owner",
  ownerOnly: true,
  args: true,
	execute(message, args, client) {
		console.log(args.join(" "));
	},
};