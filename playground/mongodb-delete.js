// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAppJo', (err, db) => {
   if(err) {
      return console.log('Unable to connect to MongoDB server Joch');
   }
   console.log('Connected to MongoDB server');

   // deleteMany
   // db.collection('Users').deleteMany({name: 'Ikke'}).then((result) => {
   //    console.log(result);
   // });

   // deleteOne
   // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
   //    console.log(result);
   // });

   // findOneAndDelete
   db.collection('Users').findOneAndDelete({ _id: new ObjectID("596f46d45f3e0d0a104c6a69")}).then((result) => {
      console.log(result);
   });

   db.close();
});
