'use strict';

const adapter = require('../adapters/api-gateway');
const Response = require('../lib/response');
const http = require('http');

module.exports = function(app) {
  return http
    .createServer( (req, res) => {

      try {
        const request = {
          uri: req.url,
          method: req.method,
          contentType: req.headers['content-type'] || 'text/html'
        };

        const routeHandler = adapter.handle(app, request);

        const response = new Response()
          .on('end', data => {
            res.writeHead(response.statusCode, { 'Content-Type': request.contentType });
            res.write(typeof data === 'string' ? data: JSON.stringify(data));
            res.end();
          });

        routeHandler(request, response);
      }
      catch(e){
        console.log(e);
        res.writeHead(500, { 'Content-Type': req.headers['content-type'] || 'text/html' });
        res.write(JSON.stringify(e));
        res.end();
      }
    })
    .on('error', err => {
      console.log(err);
    });
};