const crypto = require('crypto');
const { PWDSALT } = require('../config')

exports.hashPassword = (passwd) => {
  return crypto.pbkdf2Sync(passwd, PWDSALT, 100, 64, `sha512`).toString(`hex`);
}

exports.verifyPassword = (hash, passwd) => {
  const newHash = crypto.pbkdf2Sync(passwd, PWDSALT, 100, 64, `sha512`).toString(`hex`); 
  return newHash === hash;
}
