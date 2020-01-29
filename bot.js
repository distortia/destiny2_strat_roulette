const http = require('http')

const port = process.env.PORT || 3000

const Discord = require('discord.js')
const bot = new Discord.Client()
const GDocs = require('google-spreadsheet')

let doc = new GDocs('1hVzkJKOJBL5Kd5YKA-KUxo1cdpWpQK06pLhR5uA0ar8')
const TOKEN = process.env.TOKEN

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
})

server.listen(port, () => {
    console.log('server up')
    bot.login(TOKEN)
    
    let randomNumber = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }
    
    bot.on('ready', () => {
        console.info(`Logged in as ${bot.user.tag}!`)
    })
    
    bot.on('message', msg => {
        if (msg.content === '!strat') {
            doc.getInfo((_err, info) => {
                sheet = info.worksheets[0]
                sheet.getRows({
                    offset: 1,
                }, (err, rows) => {
                    if (err) {
                        console.dir(err)
                    }
                    random_row = randomNumber(rows.length)
                    row = rows[random_row]
                    strat = {
                        name: row.name,
                        description: row.description,
                        creator: row.creator
                    }
                    msg.reply(`#${random_row} **${strat.name}** - ${strat.description} by *${strat.creator}*`)
                })
            })
        }
    })
})

