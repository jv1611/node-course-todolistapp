const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const {ObjectID} = require('mongodb');

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

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
      res.send({todos});
   }, (e) => {
      res.status(400).send(e);
   });
});


// GET /todos/123
app.get('/todos/:id', (req, res) => {
   var id = req.params.id;
   console.log(id);
   // Valid id using isValid
   if(!ObjectID.isValid(id)) {
      // return console.log('Id is not valid.');
      return res.sendStatus(404).send();
   }

   Todo.findById(id).then((todo) => {
      if(!todo){
         // return console.log('No Todos found.');
         return res.sendStatus(400).send();
      }
      console.log('Todo By Id: ', todo.text);
      res.send({todo});
   }).catch((e) => {
      res.sendStatus(400).send();
   });
});


app.listen(port, () => {
   console.log(`Server has started on port ${port}.`);
});

module.exports = {app};
