const Canvas = require('canvas');
const discord = require('discord.js');
const { randColor } = require("../../lib");

module.exports = {
	name: 'bow',
	description: 'Bows to the user, or the mentioned.',
  category: "Memes",
	usage: '<@person>',
	execute(message, args, client) {
		imgmani(message, args, client);
	}
}

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 5}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 400);
	
	return context.font;
};

async function imgmani(message, args, client){
	message.channel.startTyping();
	const canvas = Canvas.createCanvas(754, 564);
	const context = canvas.getContext('2d');
	
	const background = await Canvas.loadImage('./content/bow.jpg');
	context.drawImage(background, 5, 5, canvas.width-10, canvas.height-10);
	
	context.strokeStyle = randColor().hex;
	context.lineWidth = 10;
	context.strokeRect(0, 0, canvas.width, canvas.height);
	
	const mentionList = message.mentions.users.map(user => {
			return {"id":user.id, "name":user.username}
		});
	const mentioned = mentionList.shift()
	
	var nametext;
	if (!message.mentions.users.size) nametext = message.member.displayName;
	else nametext = mentioned.name;
	
	context.font = applyText(canvas, nametext);
	context.fillStyle = '#000000';
	context.fillText(nametext, 25, 75);
	
	context.font = '50px sans-serif';
	context.fillStyle = '#000000';
	context.fillText('supremacy', 25, 125);
	
	var avatar;
	if (!message.mentions.users.size) avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));	
	else avatar = await Canvas.loadImage(client.users.cache.get(mentioned.id).displayAvatarURL({ format: 'jpg' }));

	context.drawImage(avatar, 425, 25, 250, 250);
	
	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'output.png');
	
	message.channel.send(attachment).then(message.channel.stopTyping());
}