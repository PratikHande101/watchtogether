const express = require('express')
var app = express();
const path = require('path')
const http = require('http').Server(app); 
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

io.on('connection', function(socket){
  socket.on('playerEvent', function(msg){
    console.log(msg);
    io.emit('playerEvent', msg);
  });
  console.log('a user connected');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

