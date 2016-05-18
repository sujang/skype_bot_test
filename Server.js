const fs = require('fs');
const restify = require('restify');
const skype = require('skype-sdk');

console.log('Server.js Called');

const botService = new skype.BotService({
    messaging: {
        botId: process.env.BOT_ID,
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET
    }
});
console.log('botService Created');

botService.on('contactAdded', (bot, data) => {
    bot.reply(`Hello ${data.fromDisplayName}!`, true);
});

botService.on('personalMessage', (bot, data) => {
	bot.send('ais_k_kangsujang', 'aaaaa', true, clback);
	// bot.reply('aaaa', true);
    // bot.reply(`Hey ${data.from}. Thank you for your message: "${data.content}".`, true);
});

function clback() {
	console.error('callback called');
}
const server = restify.createServer();

console.log('server Created');

/* Uncomment following lines to enable https verification for Azure.
server.use(skype.ensureHttps(true));
server.use(skype.verifySkypeCert({}));
*/

server.post('/v1/chat', skype.messagingHandler(botService));
const port = process.env.PORT || 8080;
server.listen(port);
console.log('Listening for incoming requests on port ' + port);