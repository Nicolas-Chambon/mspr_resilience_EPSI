require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressIp = require('express-ip');
const path = require('path');
const loginRouter = require('../src/routes/login');
const ipRouter = require('../src/routes/confirm-ip');
const navRouter = require('../src/routes/confirm-navigator');

const hostname = process.env.HOST || 'localhost';
const port =  process.env.PORT || 3000;
const app = express();

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');
const PUBLIC_FILE_PATH = path.join(__dirname, '../public');

// Static files
app.use("/", express.static(CLIENT_BUILD_PATH));
app.use("/public", express.static(PUBLIC_FILE_PATH));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressIp().getIpInfoMiddleware);
app.use(bodyParser.json());
app.use("/", loginRouter);
app.use("/", ipRouter);
app.use("/", navRouter);

app.all('*', function (req, res) {
  res.redirect('/');
});

const server = app.listen(port, hostname, () => {
  console.log("Server now running on http://" + hostname + ":" + port);
});

module.exports = server;
