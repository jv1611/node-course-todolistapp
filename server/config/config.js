var env = process.env.NODE_ENV || 'development';
console.log('env *********', env);

if (env === 'development' || env === 'test') {
   var config = require('./config.json');
   var envConfig = config[env];

   // Object.keys(envConfig); // 'PORT', 'MONGODB_URI'
   // console.log(Object.keys(envConfig));
   Object.keys(envConfig).forEach((key) => {
      process.env[key] = envConfig[key];
   });
}


// Oud, dit staat nu allemaal in config.JSON
// if (env === 'development') {
//    process.env.PORT = 3000;
//    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//    process.env.PORT = 3000;
//    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
