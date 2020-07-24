const telegramAPI = require('node-telegram-bot-api')
const telegramToken = require('./credentials/token-bot.json').token
const gospel = require('./crawlet.js')

//console.log("token: " + telegramToken)

// Criando bot, 'polling' busca novas atualizações
function botInit() {
    const bot = new telegramAPI(telegramToken, {polling: true})

    bot.onText(/r (.+)/, (msg, match) => { // comandos com /<comando>
        const chatID = msg.chat.id
        const resp = match[1] // o que vem depois do comando
    
        bot.sendMessage(chatID, resp)
        console.log(match)
    })
    
    bot.on('message', async (msg) => { 
        const chatID = msg.chat.id
        console.log('> mensagem recebida: \n', msg.text)
    
        //bot.sendMessage(chatID, 'Mensagem recebida!')        

        if (msg.text.toLowerCase() == "evangelho"){

            const mensagem = await gospel.randomGospel() // max 4096 caracteres
            
            msg = mensagem.split('. ')

            for (let i = 0; i < msg.length - 1; i++) {
                console.log(msg[i])
                await bot.sendMessage(chatID, msg[i])
            }

        }
    })

}
module.exports.botInit = botInit