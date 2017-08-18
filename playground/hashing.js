const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(12, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash1) => {
      console.log('Hash1: ' +hash1);
      var password = hash1;
      console.log('*** In bcrypt boven');
      console.log('Password: ' +password);
      console.log('***** In bcrypt onder');
   });
});

setTimeout(() => {
   console.log('********* In setTimeout');
   console.log(password);
}, 2000);

console.log('********* buiten');
console.log(password);

var hashedPassword = '$2a$10$pUuzZDejugSR3WV5oukxMOueeFB0I80C0NYJWke0t.awvra.yrhlS';
// var hashedPassword1 = '$2a$10$y/nkHkGBjBAPcmullM95Ae7oDTsXP8c/Ms1ViqInsRlcY/W4Zh9Fq';
//
bcrypt.compare(password, hashedPassword, (err, res) => {
   console.log(res);
});
//
// bcrypt.compare(password, hashedPassword1, (err, res) => {
//    console.log(res);
// });

// var data = {
//    id: 10
// };
//
// var token = jwt.sign(data, '123abc'); // 123abc is hier het Salt (oftewel secret)
// console.log(token);
//
// var decoded = jwt.verify(token, "123abc");
// console.log('Decoded bij ikke: ', decoded);



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
