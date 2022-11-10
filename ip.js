const fs = require('fs')
const prompt = require('prompt-sync')()
var ip = fs.readFileSync('ip.txt','utf-8')
var newip = prompt('Nueva IP: \n')
fs.writeFileSync('ip.txt', String(newip), function(err) {
    if (err) {
        console.log(err)
    }
})

console.log('anterior: ' + ip + 'Nueva: ' + newip)
