# gateway-js - under construction

## introduction

The intention of this project is to produce an express-like api that will allow you to deploy your applications to AWS API Gateway/Lambda whilst still defining routes using your application code.

## usage

Define your routes using the gateway-js api: `app.[method](uri, contentType, handler)`

and export your `app` object so gateway-js can create routes in API Gateway:

```js
const Gateway = require('gatewayjs');
const app = new Gateway();
const json = 'application/json';

app.get('/hello/world', json, (req, res) => {
  res.send({ hello: ', world!' });
});

app.get('/hello/foo', json, (req, res) => {
  res.send({ hello: ', foo!' });
});

module.exports = app;
```