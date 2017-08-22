var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
   text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   completedAt: {
      type: Number,
      default: null
   },
   _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
   }
});

module.exports = {Todo};

// var newTodo = new Todo({
//    text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//    console.log('Saved todo', doc);
// }, (e) => {
//    console.log('Unable to save the Todo');
// });

// var newTodo = new Todo({
//    text: "Learn Mongoose",
//    completed: true,
//    completedAt: 2017
// });
//
// newTodo.save().then((doc) => {
//    console.log('Saved new Todo', doc);
// }, (e) => {
//    console.log('Unable to save new Todo');
// });

// User
// email - require it - trim it - set type - set min length 1
