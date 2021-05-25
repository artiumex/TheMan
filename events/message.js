const mongoose = require('mongoose');
const User = require('../database/models/userSchema');
const Habs = require('../database/models/habsSchema');
const { reply } = require("../lib");

module.exports = {
	name: 'message',
	async execute(message, client) {
		if(message.author.bot) return;

    if(message.content.toLowerCase().includes("habitman")) return message.reply("please, call me Tony. Habitman was my father.");

    if(!message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if(message.channel.type == 'dm' && command.name !== "help") return;

    if(command.hCmd && ["825961601215496272","845902433451507742"].includes(message.guild.id)) return reply(message,`You can't use that command here!`);

    if(command.ownerOnly && message.author.id !== "256880604359032832") return reply(message,`You can't use that command, silly goose!`);

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