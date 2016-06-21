
const mock = require('mock-require');
const Gateway = require('./gateway');
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


mock('./', app);

require('./handlers/http');