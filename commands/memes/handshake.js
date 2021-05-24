const Canvas = require('canvas');
const discord = require('discord.js');
const { randColor } = require("../../lib");

module.exports = {
	name: 'handshake',
	description: 'Makes you shakes hands with the person mentioned.',
  category: "Memes",
	args: true,
	usage: '[@person]',
	execute(message, args, client) {
		imgmani(message, args, client);
	}
}

async function imgmani(message, args, client){
	message.channel.startTyping();
	const canvas = Canvas.createCanvas(510, 653);
	const context = canvas.getContext('2d');
	
	const background = await Canvas.loadImage('./content/handshake.jpg');
	context.drawImage(background, 5, 5, canvas.width-10, canvas.height-10);
	
	context.strokeStyle = randColor().hex;
	context.lineWidth = 10;
	context.strokeRect(0, 0, canvas.width, canvas.height);
	
	const mentionList = message.mentions.users.map(user => {
			return {"id":user.id, "name":user.username}
		});
	const mentioned = mentionList.shift()
	
	//put the image of the mentioned person on the left guy's head
	var avatar1 = await Canvas.loadImage(client.users.cache.get(mentioned.id).displayAvatarURL({ format: 'jpg' }));

	context.drawImage(avatar1, 95, 96, 125, 125);
	
	//put the image of the person who sent the command on the right guy's head
	var avatar2 = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));

	context.drawImage(avatar2, 240, 86, 125, 125);
	
	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'output.png');
	
	message.channel.send(attachment).then(message.channel.stopTyping());
}