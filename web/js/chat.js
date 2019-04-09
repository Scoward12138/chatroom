/*chat.js*/
$(function(){
    
    var socket = io('ws://localhost:8081');
    
    var uname = null;

    var upassword = null;
    
    $('.login-btn').click(function(){
        uname = $.trim($('#loginName').val());
        upassword = $.trim($('#loginPassword').val());
        if(uname && upassword){
            
            socket.emit('login',{username:uname,password:upassword})
        }else{
            alert('Please enter your name and password')
        }
    })

    $('.NewUser-btn').click(function(){
        uname = $.trim($('#NewName').val());
        upassword = $.trim($('#NewPassword').val());
        socket.emit('NewUser',{username:uname,password:upassword})    
    })


    
    socket.on('loginSuccess',function(data){
        if(data.username === uname){
            checkin(data)
        }else{
            alert('try again pls')
        }
    })

    
    socket.on('loginFail',function(){
        alert('password not correct')
    })

    socket.on('NotNewUser',function(){
        alert('User already created')
    })

    socket.on('NPpls',function(){
        alert('Please enter both name and password to register')
    })

    
    socket.on('add',function(data){
        var html = '<p>Info:'+data.username+'joined the group chat</p>';
        $('.chat-con').append(html);
    })

    
    function checkin(data){
        $('.login-wrap').hide('slow');
        $('.chat-wrap').show('slow');
    }

    
    $('.sendBtn').click(function(){
      sendMessage()
    });
    
    function sendMessage(){
        var txt = $('#sendtxt').val();
        $('#sendtxt').val('');
        if(txt){
            socket.emit('sendMessage',{username:uname,message:txt});
        }
    }

    
    socket.on('receiveMessage',function(data){
        showMessage(data)
    })

    
    function showMessage(data){
        var html
        if(data.username === uname){
            html = '<div class="chat-item item-right clearfix"><span class="img fr"></span><span class="message fr">'+data.message+'</span></div>'
        }else{
            html='<div class="chat-item item-left clearfix rela"><span class="abs uname">'+data.username+'</span><span class="img fl"></span><span class="fl message">'+data.message+'</span></div>'
        }
        $('.chat-con').append(html);
    }

})

    
