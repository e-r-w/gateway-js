'use strict';

const CfDriver = require('../').CfDriver;

new CfDriver({
  name: 'my-api', // the name of your app
  bucket: 'e-r-w-my-api-bucket', // the name of the bucket your lambda is stored in
  bucketKey: 'my-api-lambda', // the s3 bucket key where your lambda is stored
  region: 'us-west-2' // the region your lambda will be deployed to
})
  .generate(require('./lambda').app)
  .then( result => fs.writeFile('cf-template.json', result, err => {
    console.log('finished!');
    if(err){
      console.log('ERROR:');
      console.log(err);
    }
  }))
  .catch( err => console.log(err) );