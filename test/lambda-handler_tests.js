'use strict';
const expect = require('chai').expect;
const Gateway = require('../').Gateway;

describe('lambda handler', function(){

  it('should handle api gateway/lambda request', done => {

    const app = new Gateway();
    app.get('/foobar',
      {contentType: 'application/json'},
      (req, res) => {
        res.send('foobar');
      });
    require('../').lambdaHandler(app)({
      uri: '/foobar',
      method: 'GET',
      contentType: 'application/json'
    }, null, data => {
      expect(data.body).to.equal('foobar');
      done();
    });

  });

});