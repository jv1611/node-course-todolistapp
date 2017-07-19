// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAppJo', (err, db) => {
   if(err) {
      return console.log('Unable to connect to MongoDB server Joch');
   }
   console.log('Connected to MongoDB server');

   // db.collection('Todos').find({
   //    _id: new ObjectID("596f42a202205b12b872ae56")
   // }).toArray().then((docs) => {
   //    console.log('Todos');
   //    console.log(JSON.stringify(docs, undefined, 2));
   // }, (err) => {
   //    console.log('Unable to fetch todos', err);
   // });

   // db.collection('Todos').find().count().then((count) => {
   //    console.log(`Todos count: ${count}`);
   //    // console.log(JSON.stringify(docs, undefined, 2));
   // }, (err) => {
   //    console.log('Unable to fetch todos', err);
   // });

   db.collection('Users').find({name: 'Ikke'}).toArray().then((docs) => {
      console.log('Allemaal ikke: ');
      console.log(JSON.stringify(docs, undefined, 2));
   }, (err) => {
      console.log('Ik kan Ikke niet vinden', err);
   });

   db.close();
});
