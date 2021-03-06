var {User} = require('../models/user');

var authenticate = (req, res, next) => {
   var token = req.header(`x-auth`);

   User.findByToken(token).then((user) => {
      if(!user) {
         return Promise.reject();
      }
      // res.send(user);
      req.user = user;
      req.token = token; // Hier wordt dus een token verstrekt aan de user
      next();
   }).catch((e) => {
      res.status(401).send();
   });
};

module.exports = {authenticate};
