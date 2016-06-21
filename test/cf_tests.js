'use strict';
const expect = require('chai').expect;
const driver = require('../lib/cf-driver');
const json = require('../lib/content-types').json;
const Gateway = require('../');
const noop = () => {};

describe('cloudformation driver', function(){

  it('should generate cloudformation', done => {

    const fixture = require('./fixtures/cf-tests-1.json');
    const app = new Gateway({
      name: 'cf-test-api',
      bucket: 'cf-test-api-bucket',
      bucketKey: 'cf-test-api-lambda'
    });

    app.get('/foobar', json, noop);

    driver
      .generate(app)
      .then( cf => {
        expect(cf).to.deep.equal(fixture);
        done();
      })
      .catch( err => done(err) );

  });

});