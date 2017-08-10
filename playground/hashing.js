const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
   id: 10
};

var token = jwt.sign(data, '123abc'); // 123abc is hier het Salt (oftewel secret)
console.log(token);

var decoded = jwt.verify(token, "123abc");
console.log('Decoded bij ikke: ', decoded);



// DEMONSTRATIE
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//    id: 4
// };
// var token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // 2 regels om te vervalsen
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//    console.log('Data was not changed');
// } else {
//    console.log('Data was changed. Do not trust this!');
//    console.log(`Hash: ${resultHash}`);
// }
