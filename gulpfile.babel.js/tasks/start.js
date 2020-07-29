const http = require('http');

module.exports = (cb) => {
  console.log('im start file');

  http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello LiLu');
  }).listen(3000);
  cb();
}