const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      minlength: 1,
      trim: true, // trim haalt spatie aan het begin en einde weg.
      unique: true, // als ik het goed heb is dit mongoose
      validate: {
         validator: validator.isEmail,
         message: `{VALUE} is not a valid email`
      }
   },
   password: {
      type: String,
      require: true,
      minlength: 6
   },
   tokens: [{ // tokens is a Mongoose thing. It is not available in sql
      access: {
         type: String,
         required: true
      },
      token: {
         type: String,
         required: true
      }
   }]
});

UserSchema.methods.toJSON = function () {
   var user = this;
   var userObject = user.toObject();

   return _.pick(userObject, ['_id', 'email']); // met _.pick geven we aan wat we terug willen zien
   // van het userObject alleen de _id en email; zie postman voor resultaat
};

UserSchema.methods.generateAuthToken = function (){
   // we gebruiken hier function ipv => omdat we this willen gebruiken
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

   user.tokens.push({access, token});

   return user.save().then(() => {
      return token;
   });
};

var User = mongoose.model('User', UserSchema);
// email, password, tokens van UserSchema stonden eerst allemaal hieronder.


module.exports = {User};
