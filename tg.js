var express = require('express');
var http = require('http');
var app = express();

var db = require('mongojs').connect('rest', ['todos', 'users']);

app.use(express.logger());                    //로그를 출력
app.use(express.bodyParser());                //POST,PUT,DELETE 요청의 요청매개변수를 추출
app.use(express.cookieParser('secret key'));  //쿠키와 관련된 기능 사용
  app.use(express.session());                   //세션을 사용
app.use(express.static('public'));            //public폴더 내부의 모든파일을 서버로 올림
app.use(app.router);                          //라우터를 사용
app.get('/', function (request, response) {

});
http.createServer(app).listen(8080, function () {
  console.log('Express server listening on port 8080');
});
