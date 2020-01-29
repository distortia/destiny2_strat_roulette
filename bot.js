const Discord = require('discord.js')
const bot = new Discord.Client()
const GDocs = require('google-spreadsheet')

let doc = new GDocs('1hVzkJKOJBL5Kd5YKA-KUxo1cdpWpQK06pLhR5uA0ar8')
const TOKEN = process.env.TOKEN

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
            sheet = info.worksheets[0];
            sheet.getRows({
                offset: 1,
            }, function( err, rows ) {
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