
var express = require('express');

function setup(app, port) {
    app.get('/', function(req, res,next) {
        res.sendFile(__dirname + '/web/index.html');
    });
    app.use(express.static('web'));
    app.listen(port, "0.0.0.0");
}

module.exports = {
    "setup": setup
}