const mongoose = require('mongoose');
const User = require('../database/models/userSchema')
const Habs = require('../database/models/habsSchema');

module.exports = {
	name: 'message',
	async execute(message, client) {
		if(message.author.bot) return;

    if(!message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if(message.channel.type == 'dm' && command.name !== "help") return;

    if(command.hCmd && message.guild.id !== "825961601215496272") return message.delete().catch(err => console.log(err));

    if(command.ownerOnly && message.author.id !== "256880604359032832") return message.delete().catch(err => console.log(err));

    var noArgsMsg = "Please provide the proper arguments! ";
    if(command.usage) noArgsMsg += `\`${client.prefix}${command.name} ${command.usage}\``;
    if(command.args && !(args.length > 0)) return message.channel.send(noArgsMsg); 

    try {
    	command.execute(message, args, client);
    } catch (error) {
      console.log(error);
    }
	},
};