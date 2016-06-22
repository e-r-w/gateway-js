'use strict';

const Gateway = require('../').Gateway;
const app = new Gateway();

app.get('/foobar',
  { contentType: 'application/json' },
  (req, res) => {
    res.send({
      foo: 'bar'
    });
  });

app.get('/foo',
  { contentType: 'text/html' },
  (req, res) => {
    res.send('foobar');
  });

require('../').httpHandler(app).listen(8009);