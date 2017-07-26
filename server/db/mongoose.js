const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://jochen:nodejochen@ds055842.mlab.com:55842/nodecursusandrew' || 'mongodb://localhost:27017/TodoApp', {
mongoose.connect('mongodb://localhost:27017/TodoApp', {
   useMongoClient: true
});


module.exports = {mongoose};
