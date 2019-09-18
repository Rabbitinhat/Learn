var host = process.argv[2]
var post = parseInt(process.argv[3])
const net = require('net')

process.stdin.pipe(net.connect(post, host)).pipe(process.stdout)