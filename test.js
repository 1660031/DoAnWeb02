var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var mongodb = require('mongodb');

server.listen(8080,console.log("Server Created !!!"))
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/Grobbike';

io.on('connection',(socket=>{
    console.log("Client Connected : "+socket.id)
    socket.on('guest_send_location',(pos)=>
        {
            console.log(pos)
            MongoClient.connect(url, function (err, db) {
            if (err) {
              console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
              //HURRAY!! We are connected. :)
              console.log('Connection established to', url);
              const myAwesomeDB = db.db('Grobbike')
              // Get the documents collection
              var collection = myAwesomeDB.collection('Driver');
          
              //Create some users
              var driver = {name: 'Châu Hoàng Ấn', age: 21, location: {lat:0,lon :0}};
              // Insert some users
              collection.update({name: 'Châu Hoàng Ấn'}, {$set: {location: {lat:pos.lat, lng: pos.lng}}}, function (err, numUpdated) {
                if (err) {
                  console.log(err);
                } else if (numUpdated) {
                  console.log('Updated Successfully %d document(s).', numUpdated);
                } else {
                  console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                db.close();
              });
            }
          });
        }
    )
}))


