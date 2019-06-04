var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/Grobbike';

var updateLocation = function(pos){
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
}
var queryLocation = function(emit){
    {
        MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
          return null;
        } else {
          //HURRAY!! We are connected. :)
          console.log('Connection established to', url);
          const myAwesomeDB = db.db('Grobbike')
          // Get the documents collection
          var collection = myAwesomeDB.collection('Driver');
      
          //Create some users
          // Insert some users
          setInterval(()=>collection.find({name: 'Châu Hoàng Ấn'}).toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              // io.sockets.emit('server_send_location',result);
              // io.sockets.emit('server_send_location',result);
              emit(result[0].location);

            } else {
              console.log('No document(s) found with defined "find" criteria!');
            }
            //Close connection
            db.close();
          }),3000) 
        }
      });
    }
}
module.exports.updateLocation=updateLocation;
module.exports.queryLocation=queryLocation;