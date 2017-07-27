const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://jochen:nodejochen@ds055842.mlab.com:55842/nodecursusandrew' || 'mongodb://localhost:27017/TodoApp', {
// mongoose.connect('mongodb://jochen:nodejochen@ds055842.mlab.com:55842/nodecursusandrew' Dit kan weggehaald worden vanaf Les86
// Zou moeten zijn: mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/TodoApp', {
// Zou moeten zijn: mongoose.connect(process.env.MONGODB_URI);
   useMongoClient: true
});

module.exports = {mongoose};
