const fs = require("fs");
const stream = require("stream");
const url = require("url");
const path = require("path");
const { createServer } = require("http");
const mimes = require("mime-types");

//  避免属性, 方法继承?
//  方便in操作符使用?
const methods = Object.create(null);
// 当前位置的绝对路径
const baseDir = path.resolve("./");

createServer((req, resp) => {
  if (req.url === "/favicon.ico") {
    console.log('stop icon request')
    resp.end();
  } else {
    function response(statsCode, respBody, contType) {
      if (!contType) contType = "text/plain";
      resp.writeHead(statsCode, {'Content-Type': `${contType}; charset=utf-8`});
      if (respBody && respBody.pipe) {
        respBody.pipe(resp);
      } else if (respBody) {
        resp.end(respBody);
      } else {
        resp.end();
      }
    }
    if (req.method.toLowerCase() in methods) {
      methods[req.method.toLowerCase()](urlToParse(req.url), response);
    } else {
      resp(405, `Method ${req.method} is not allowed`);
    }
  }
}).listen(8090);

function urlToParse(reqUrl) {
  let path = url.parse(reqUrl).pathname;
  return "." + decodeURIComponent(path);
}

methods["get"] = function(path, response) {
  fs.stat(path, (err, stat) => {
    if (err && err.code === "ENOENT") {
      response("404", "File not Found");
    } else if (err) {
      response("500", err.toString());
    }
    console.log(stat)
    if (stat.isDirectory()) {
      fs.readdir(path, { withFileTypes: true }, (err, dirs) => {
        if (err) {
          response("500", err.toString());
        } else {
          response("200", `
          ${dirs.map(dir => {
            let slash = dir.isDirectory() ? "/" : "";
            let tag = `<div>
            <a href='${dir.name}${slash}'>${dir.name}${slash}</a>
            </div>`
            return tag;
          }).join('')}
          `, 'text/html');
        }
      });
    }

    if (stat.isFile()) {
      response("200", fs.createReadStream(path), mimes.lookup(path));
    }
  });
};
