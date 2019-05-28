var express = require('express');
var app = express();
var server = require('http').Server(app)
var router = express.Router();
var io = require('socket.io')(server)
var arr_pos=[];
router.get('/', function(req, res, next) {
 
});

module.exports = router;
