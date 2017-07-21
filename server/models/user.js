var mongoose = require('mongoose');

var User = mongoose.model('User', {
   name: {
      type: String,
      required: true,
      minlength: 1
   },
   email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true // trim haalt spatie aan het begin en einde weg.
   }
});

// var newUser = new User({
//    name: "Jan",
//    email: '                jan@dehond.nl' // Spaties worden weggehaald door "trim"
// });
//
// newUser.save().then((doc) => {
//    console.log('Created new User', doc);
// }, (e) => {
//    console.log('Unable to create new user');
// });

module.exports = {User};
