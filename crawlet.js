const request = require('request')
const cheerio = require('cheerio')
const Promise = require('promise')


async function randomGospel() {

    return new Promise( (resolve, reject) => {
        // 1 ~ 243
        const random = Math.floor(Math.random() * 243 + 1)

        request(`http://oconsolador.com.br/print.asp?id=${random}`, {encoding: 'latin1'},
        function (err, res, body) {
        
            if (err) {
                console.log('Erro cara: ', err)
                reject(err)
            }

            //console.log(body.toString()) // pagina
    
            const $ = cheerio.load(body, {decodeEntities: false})
            const titulo = $('h1').html().trim()
            const texto = $('h2').html().trim()

            // \.  [\w\s\W]+/ -> tudo que vinher depois do \.
            // \<[\w\s\W]+\> -> < , > e tudo dentro deles
            // \([\w\s\W]+\) -> ( , ) e tudo dentro deles
            const splitMsg = (titulo + '. ' + texto).toString().replace(/\<[\w\s\W]+\>/, ' ').replace(/\([\w\s\W]+\)/, ' ')          
            
            //console.log(splitMsg) //  string formatada

            resolve(
                splitMsg
            )            
        })        
    })
}

randomGospel()

module.exports.randomGospel = randomGospel