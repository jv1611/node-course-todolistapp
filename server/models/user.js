const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
   var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

   user.tokens.push({access, token});

   return user.save().then(() => {
      return token;
   });
};

UserSchema.methods.removeToken = function (token) {
   var user = this;
   return user.update({
      $pull: {
         tokens: {token}
      }
   });
};

UserSchema.statics.findByToken = function (token) {
   var User = this;
   var decoded;

   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (e) {
      return Promise.reject();
   }

   return User.findOne({
      '_id' : decoded._id,
      'tokens.token' : token,
      'tokens.access' : 'auth'
   })
};

UserSchema.statics.findByCredentials = function (email, password) {
   var User = this;
   return User.findOne({email}).then((user) => {
      if (!user) {
         return Promise.reject();
      }

      return new Promise((resolve, reject) => {
         bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
               resolve(user);
            } else {
               reject();
            }
         });
      });
   });
};

UserSchema.pre('save', function (next) {
   var user = this; // Door 'pre' wordt 'save' pas uitgevoerd na next()

   if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(user.password, salt, (err, hash2) => {
            // console.log(hash2);
            // user.password = 'hash1';
            user.password = hash2;
            // console.log('****');
            // console.log(user.password);
            // console.log('******');
            next();
         });
      });
      // console.log(user.password);
      // console.log(user.password);
      // next();
      // NOG VERDER TESTEN WERKT NOG NIET GOED
      // user.password = hash;
   } else {
       next();
   }
});


var User = mongoose.model('User', UserSchema);
// email, password, tokens van UserSchema stonden eerst allemaal hieronder.


module.exports = {User};
