const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})
// Todo.remove({}).then((result) => {
//    console.log(result);
// });

// Todo.findOneAndRemove( )
// Todo.findOneAndRemove({_id: '5978a2e578bf7febb98c5e9f'}).then((todo) => {
//    console.log(todo);
// });

// Todo.findByIdAndRemove geeft de info die verwijderd wordt terug
Todo.findByIdAndRemove('5978a2e578bf7febb98c5e9f').then((todo) => {
   console.log(todo);
});

// var id = '5975fffd2d9bb42dc0356473';
//
// if(!ObjectID.isValid(id)) {
//    console.log('Id is not valid.');
// }
//
// // Todo.find({ // meerdere items dus Array [ ]
// //    _id: id
// // }).then((todos) => {
// //    console.log('Todos', todos);
// // });
// //
// // Todo.findOne({ // met findOne krijg je een Document terug ipv een Array
// //    _id: id
// // }).then((todo) => {
// //    console.log('Todos', todo);
// // });
//
// Todo.findById(id).then((todo) => {
//    if(!todo){
//       return console.log('Id not found.');
//    }
//    console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));
//
// // User.findById
// var id = '5970d0f52c5c2a031cbcd00a';
//
// if(!ObjectID.isValid(id)) {
//     return console.log('Deze user ID is not valid');
// };
//
// User.findById(id).then((user) => {
//    // console.log('User gegevens', user);
//    console.log(JSON.stringify(user, undefined, 2));
// }).catch((e) => console.log(e));
