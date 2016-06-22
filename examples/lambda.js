'use strict';

// index.js
const lambdaHandler = require('../').lambdaHandler;
const Gateway = require('../').Gateway;
const app = new Gateway();
const json = 'application/json';

app.get('/hello', {contentType: json}, (req, res) => {
  res.send({ hello: ', world!' });
});

exports.app = app; // exposed for API gateway
exports.handler = lambdaHandler(app); // exposed for lambda