const {createReadStream, createWriteStream} = require('./fileStream.js')

createReadStream('./getlocalFile.js')
.pipe(createWriteStream('./cp-getLocalFile.js'))