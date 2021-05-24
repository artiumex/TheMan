const Canvas = require('canvas');
const discord = require('discord.js');
const { randColor } = require("../../lib");

module.exports = {
	name: 'insult',
	description: 'Insults yourself or the person mentioned.',
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
	const canvas = Canvas.createCanvas(1290, 1018);
	const context = canvas.getContext('2d');
	
	const background = await Canvas.loadImage('./content/isthisa.jpg');
	context.drawImage(background, 5, 5, canvas.width-10, canvas.height-10);
	
	context.strokeStyle = randColor().hex;
	context.lineWidth = 10;
	context.strokeRect(0, 0, canvas.width, canvas.height);
	
	const mentionList = message.mentions.users.map(user => {
			return {"id":user.id, "name":user.username}
		});
	const mentioned = mentionList.shift()
	
	context.font = '100px sans-serif';
	context.fillStyle = '#ffffff';
	
	context.fillText('Is this a dumbass?', 50, 950);
	
	var truex = 970 , truey = 210, truedim = 200;
	
	context.beginPath();
	context.arc((truex+(truedim/2)), (truey+(truedim/2)), (truedim/2), 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
	
	var avatar;
	if (!message.mentions.users.size) avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));	
	else avatar = await Canvas.loadImage(client.users.cache.get(mentioned.id).displayAvatarURL({ format: 'jpg' }));

	context.drawImage(avatar, truex, truey, truedim, truedim);
	
	
	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'output.png');
	
	message.channel.send(attachment).then(message.channel.stopTyping());
}
