const sequential = require('sequential-ids')

const generator =  new sequential.Generator({
    digit : 3,
    restore : "000"
})

generator.start()

module.exports = generator