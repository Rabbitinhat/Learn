var net = require('net')
var querystring = require('querystring')
var message = [{
  user: 'xx',
  message: 'good',
  timestamp: 12444443434,
},
{
  user: 'xxxx',
  message: 'bad',
  timestamp: 12212132311,
}
]
var server = net.createServer(conn => {
  conn.on('data', data => {
    var require = data.toString()
    var [headers, body] = require.split('\r\n\r\n')
    var [firstline, ...header] = headers.split('\r\n')
    var [method, path, protcol] = firstline.split(' ')


    if(method === 'POST'){
      let newMs = {}
      newMs.user = querystring.parse(body).user
      newMs.message = querystring.parse(body).message
      newMs.timestamp = Date.now()
      message.push(newMs)
    }

    if(true || method === 'GET'){
      let protocl = 'HTTP/1.1'
      let status = '200 OK'
      let returnMessage = protocl + ' ' + status + '\r\n'
      returnMessage += 'Content-Type: text/html; charset=UTF-8\r\n'
      returnMessage += 'Date: ' + new Date().toString() + '\r\n'
      returnMessage += '\r\n'
      console.log(returnMessage)
      conn.write(returnMessage)
      conn.write(`
        <body>
        <form method='post' action='/'>
        <label for="user-id">用户名</label><br/>
        <input type="text" name="user" id="user-id"><br/>
        <label for="user-message">消息</label><br/>
        <textarea name="message" id="user-message" cols="30" rows="10"></textarea><br/>
        <button type='submit'>提交</button>
        </form>
      `)
      message.reduceRight((_, ms) => {
        conn.write(`
        <div class='message' style='border: 2px solid #333;width:700px;margin:20px;padding:20px;margin-left: 0'>
        <h2>${ms.user} <span>${new Date(ms.timestamp).toISOString()}</span></h2>
        <p>${ms.message}</p>
        </div>
        </body>
        `)
      }, null)
    }
  })
})

server.listen(8080)

