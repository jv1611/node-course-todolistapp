// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'Erik', age: 23};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoAppJo', (err, db) => {
   if(err) {
      return console.log('Unable to connect to MongoDB server Joch');
   }
   console.log('Connected to MongoDB server');

   // db.collection('Todos').insertOne({
   //    text: 'More to do',
   //    completed: false
   // }, (err, result) => {
   //    if(err){
   //       return console.log('Unable to insert Todo!', err);
   //    }
   //    console.log(JSON.stringify(result.ops, undefined, 2));
   // });

   // db.collection('Users').insertOne({
   //    name: 'Ikke',
   //    age: 32,
   //    location: 'Eindhoven'
   // }, (err, result) => {
   //    if(err) {
   //       return console.log('Unable to insert a User', err);
   //    }
   //    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
   // });

   db.close();
});
