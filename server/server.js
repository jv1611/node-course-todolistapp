require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT; // || 3000; Deze kan nu weg omdat hij hierboven al staat

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
      return res.status(404).send();
   }

   Todo.findById(id).then((todo) => {
      if(!todo){
         // return console.log('No Todos found.');
         return res.status(400).send();
      }
      console.log('Todo By Id: ', todo.text);
      res.send({todo});
   }).catch((e) => {
      res.status(400).send();
   });
});

app.delete('/todos/:id', (req, res) => {
   // get id
   var id = req.params.id;
   // validate id => nog 404
   if(!ObjectID.isValid(id)) {
      console.log('Geen geldige id');
      return res.status(400).send();
   }
   // remove todo by id
   Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
         console.log('Geen todo gevonden');
         return res.status(404).send();
      }
      console.log('Deze wordt verwijderd.');
      res.send({todo});
   }).catch((e) => {
      console.log('Er ging iets fout');
      res.status(400).send();
   });
});

app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   if(!ObjectID.isValid(id)) {
      console.log('Geen geldige id');
      return res.status(400).send();
   }

   if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
   } else {
      body.completed = false;
      body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if(!todo) {
         return res.status(404).send();
      }
      res.send({todo});
   }).catch((e) => {
      console.log('Er ging iets fout bij de app.patch');
      res.status(400);
   });
});

app.listen(port, () => {
   console.log(`Server has started on port ${port}.`);
});

module.exports = {app};
