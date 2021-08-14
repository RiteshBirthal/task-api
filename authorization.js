"use strict";
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const { AUTHSECRET } = require('./config');

exports.requireAuth = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) return res.status(401).json({
    error: 'Forbidded',
    message: 'Token Not Found'
  });
  const token = authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({
    error: 'Forbidded',
    message: 'Token Not Found'
  });
  jwt.verify(token, AUTHSECRET, (err, user) => {
    if (err) return res.status(401).json({
      error: 'Unauthorized',
      message: err.message,
    });
    User.findOne({ email: user.email }, (err, userdata) => {
      if (err) {
        console.log("Error finding auth user: ", err);
        return res.status(500).json({});
      }
      req.user = userdata;
      next();
    })
  });
}
