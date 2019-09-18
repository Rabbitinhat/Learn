const net = require('net')
const fs = require('fs')

// const server = net.createServer(conn => {
//   fs.createReadStream('./').pipe(conn)
// })

// server.listen(9999, () => {
//   console.log(server.address())
// })

net.connect(9999, '10.1.1.1').pipe(process.stdout)