'use strict';
const expect = require('chai').expect;
const mock = require('mock-require');
const Gateway = require('../gateway');

describe('lambda handler', function(){

  it('should handle api gateway/lambda request', done => {

    const app = new Gateway();
    app.get('/foobar',
      {contentType: 'application/json'},
      (req, res) => {
        res.send('foobar');
      });
    mock('./', app);
    require('../handlers/lambda').handler({
      uri: '/foobar',
      method: 'GET',
      contentType: 'application/json'
    }, null, data => {
      expect(data.body).to.equal('foobar');
      done();
    });

  });

});