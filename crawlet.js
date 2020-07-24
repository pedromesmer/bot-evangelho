const request = require('request')
const cheerio = require('cheerio')
const Entities = require('html-entities').AllHtmlEntities
const Promise = require('promise')


const entities = new Entities()

//https://evangelhoespirita.wordpress.com/
function searchGospel() {
    request('https://kardecpedia.com/roteiro-de-estudos/887/o-evangelho-segundo-o-espiritismo', (err, res, body) => {
        if (err) console.log('Erro')
    
        const $ = cheerio.load(body)
        let capitulo
        let subcapitulo
    
        const elemento = $('#menu > li').find('> a')   
        
        capitulos = elemento.text().replace(/\n\t\t\t\t/g, '').replace(/\t/g, '\n').replace(/\n\n\n/g, '\n').replace(/\n\n/g, '\n').trim().split('\n')
        console.log(capitulos)
    
        //console.log('Conteudo: ')
        
    })
}

async function randomGospel() {

    return new Promise( (resolve, reject) => {
        request('http://www.oconsolador.com.br/mensagens.asp?r=1',
            {encoding: null}, (err, res, body) => {
            if (err) {
                console.log('Erro cara: ', err)
                reject(err)
            }
    
            const $ = cheerio.load(body, {decodeEntities: true})
            const titulo = $('p > b span font').html().trim()
            const texto = $('p > span font').html().trim()
    
            //entities.decode(componente)

            resolve(
                `${titulo}\n
                ${texto}`
            )            
        })        
    })
}

randomGospel()

module.exports.randomGospel = randomGospel
module.exports.searchGospel = searchGospel