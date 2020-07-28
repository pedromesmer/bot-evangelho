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
            
            msg = mensagem.split('.') // separa o texto a cada '. ' -> garante o envio de mensagens com mais de 4096 caracteres

            for (let i = 0; i < msg.length; i++) {
                console.log(msg[i])
                if (!msg[i]) continue // Se a string vinher vazia, pule esse laço
                await bot.sendMessage(chatID, msg[i]) // aguarda o envio da mensagem para enviar a próxima -> garante o envio na ordem
            }

        }
    })

}

botInit()