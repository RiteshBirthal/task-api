const express = require('express');
const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');
const logger = require('morgan');

const { PORT, DBURL } = require('./config');

const router = require('./router');

/*** Database Connection ***/
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

/*** Initials ***/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', "Origin, X-requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/*** Start the Server ***/
server.listen(PORT, () => {
  console.log('Server Listening on port '+ PORT +'.');
});

router(app);
