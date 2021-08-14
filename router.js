const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const passwdUtil = require('./utils/password');
const auth = require('./authorization');
const { AUTHSECRET, TOKENEXPIRE } = require('./config')

module.exports = (app) => {
  /***  Initializing route groups  ***/
  const apiRoutes = express.Router();

  /*** Authentication Routes ***/

  apiRoutes.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name) return res.status(402).json({
      status: "Failed",
      message: "Name should not be null."
    });
    if (!password || password.length < 8) return res.status(402).json({
      status: "Failed",
      message: "Password should be atleast 8 chars long."
    });
    let user = new User({
      name: name,
      email: email,
      passwd: passwdUtil.hashPassword(password),
    });
    user.save().then((_) => {
      return res.json({
        status: "Success",
        message: "You can login now using your email and password."
      });
    }).catch((err) => {
      console.log("Signup Error: ", email, password, err);
      return res.status(400).json({
        status: "Failed",
        message: "Email already registered."
      });
    });
  });

  apiRoutes.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || (user === null)) {
        return res.status(400).json({
          status: "Failed",
          message: "User does not exist.",
        })
      }
      if (passwdUtil.verifyPassword(user.passwd, password)) {
        let authToken = jwt.sign({
          email: user.email,
        }, AUTHSECRET, {expiresIn: TOKENEXPIRE});
        return res.json({
          status: "Success",
          token: authToken,
          message: `Token Expires in ${TOKENEXPIRE} seconds.`,
        });
      } else {
        return res.status(402).json({
          status: 'Failed',
          message: 'Wrong Password',
        });
      }
    });
  });

  /*** User Routes ***/
  apiRoutes.get('/home', auth.requireAuth, (req, res) => {
    res.json({
      status: "Success",
      message: `Welcome Home ${req.user.name}!!`,
    });
  });

  // Set url for API v1 group routes
  app.use('/', apiRoutes);
}