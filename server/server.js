const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// Andrew laat een spatie tussen de global import en de lokale eigen gemaakte import
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   console.log(req.body);
   var todo =new Todo({
      text: req.body.text
   });
   todo.save().then((doc) => {
      res.send(doc);
   }, (e) => {
      res.status(400).send(e);
   });
});


app.listen(port, () => {
   console.log(`Server has started on port ${port}.`);
});

module.exports = {app};
