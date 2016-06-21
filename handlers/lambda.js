'use strict';

const adapter = require('../adapters/api-gateway');
const app = require('./');
const Response = require('../lib/response');

exports.handler = (event, context, callback) => {

  const request = {
    uri: event.uri,
    method: event.method,
    contentType: event.contentType
  };

  const routeHandler = adapter.handle(app, request);

  const response = new Response()
    .on('end', data => {
      callback({
        body: data,
        statusCode: response.statusCode
      });
    });

  routeHandler(request, response);

};