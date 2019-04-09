/*app.js*/
var app = require('http').createServer()
var io = require('socket.io')(app);
var PORT = 8081;

var users = [];
users.push({
    username:'test',
    password:123
  });
users.push({
    username:'ubc',
    password:1234
  });

app.listen(PORT);
io.on('connection', function (socket) {
    
    var isNewPerson = true; 
    
    var username = null;

    var password = null;

    var isRightPassword = false;

    var oneCorrect = false;
    
    socket.on('login',function(data){
        for(var i=0;i<users.length;i++){
            if(users[i].username === data.username){
                  console.log( data.username+' is already registered')
                  if(users[i].password == data.password){
                    socket.emit('loginSuccess',data)
                    oneCorrect = true;
                  }
            }
            
        }
        if(oneCorrect == false){
                socket.emit('loginFail','')
            }
    })

    socket.on('NewUser',function(data){

        if(data.username == '' || data.password == ""){
            socket.emit('NPpls','')
        }else{

        for(var i=0;i<users.length;i++){
            if(users[i].username === data.username){
                isNewPerson = false;
                console.log( data.username+' is already registered')
                
            }else{
                  isNewPerson = true;
            }
        }

        if(isNewPerson){
            username = data.username
            users.push({
              username:data.username
            })
            
            socket.emit('loginSuccess',data)
            console.log(data.username + ' added')
            
            io.sockets.emit('add',data)
        } else{
            socket.emit('NotNewUser','')
        }
    }

    })


    socket.on('sendMessage',function(data){
        io.sockets.emit('receiveMessage',data)
    })
    
})

console.log('app listen at'+PORT);