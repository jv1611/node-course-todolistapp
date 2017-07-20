// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoAppJo', (err, db) => {
   if(err) {
      return console.log('Unable to connect to MongoDB server Joch');
   }
   console.log('Connected to MongoDB server');

   // findOneAndUpdate
   // db.collection('Todos').findOneAndUpdate({
   //     _id: new ObjectID("59707effe6d71a8b3f8358dd")
   //  }, {
   //    $set: {
   //       completed: true
   //    }
   // }, {
   //    returnOriginal: false
   // }).then((result) => {
   //    console.log(result);
   // });

   db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("596f46736c34f021b0c4788f")
    }, {
      $set: {
         name: "IkkeOok"
      },
      $inc: {
         age: 2
      }
   }, {
      returnOriginal: false
   }).then((result) => {
      console.log(result);
   });

   db.close();
});
