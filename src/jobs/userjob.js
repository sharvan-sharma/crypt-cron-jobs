const cron = require('node-cron');
const User = require('../models/index').User;
const util = require('../utils/index')

var count = 0
var quater = 0
var dataArray = []

function userjob() {
    cron.schedule(`0 0 */1 * * *`, () => {
        console.log('exec',new Date())
        const past = new Date(new Date().getTime() - (process.env.USERJOB * 3600 * 1000)) //time an hour ago
        User.deleteMany({
            verified: false,
            createdAt: {
                $lt: past
            }
        }, (err, raw) => {
            count = count + 1
            if (err) {
                dataArray.push(JSON.stringify({
                    err,
                    time: new Date()
                }))
            } else {
                dataArray.push(JSON.stringify({
                    raw,
                    time: new Date()
                }))
            }
            if (count === Number(process.env.COUNT)) {
                console.log()
                quater = quater + 1
                util.mail(quater,'crypt.oauth.service@gmail.com',dataArray)
                count = 0
                dataArray = []
                if (quater >= Math.floor(24/Number(process.env.COUNT))) {
                    quater = 0
                }
            }
        })
    })
}

module.exports = userjob