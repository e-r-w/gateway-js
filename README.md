# gateway-js - under construction

## introduction

The intention of this project is to produce an express-like api that will allow you to deploy your applications to AWS API Gateway/Lambda whilst still defining routes using your application code.

## usage

Define your routes using the gateway-js api: `app.[method](uri, options, handler)`

and export your `app` object so gateway-js can create routes in API Gateway:

```js
const Gateway = require('gatewayjs').Gateway;
const app = new Gateway();
const json = 'application/json';

app.get('/hello/world', {contentType: json}, (req, res) => {
  res.send({ hello: ', world!' });
});

app.get('/hello/foo', {contentType: json}, (req, res) => {
  res.send({ hello: ', foo!' });
});

module.exports = app;
```

### integration with AWS lambda
When creating a bundle to upload to s3 as your lambda function, you can use the pre-built lambda handler:
```js
// index.js
const lambdaHandler = require('gatewayjs').lambdaHandler;
const myApp = require('./my-app');
exports.handler = lambdaHandler(myApp);
```

This is the magic that allows you to define route handlers in an express/connect manner whilst still using lambda.

### integration with AWS API gateway
You can also use gateway-js to create cloudformation templates for API gateway.

Using your build tool of choice, you can generate cloudformation templates given a complete app, e.g for gulp:

```js
const fs = require('fs');
const CfDriver = require('gatewayjs').CfDriver;
const myApp = require('./my-app');


gulp.task('generate-cf-template', cb => {
  new CfDriver({
    name: 'my-api', // the name of your app
    bucket: 'my-api-bucket', // the name of the bucket your lambda is stored in
    bucketKey: 'my-api-lambda', // the s3 bucket key where your lambda is stored
    region: 'us-west-2' // the region your lambda will be deployed to
  })
    .generate(myApp)
    .then( result => fs.writeFile('cf-tempalte.json', result, cb) )
    .catch( err => cb(err) );
});
```
