'use strict';

exports.handle = function(app, options){

  const found = app.routes.filter( route => {
    return route.uri === options.uri &&
        route.method.toLowerCase() === options.method.toLowerCase() &&
        route.contentType === options.contentType;
  })[0];
  if(found){
    return found.handler;
  }
  else {
    return (req, res) => {
      res
        .status(404)
        .send('Not Found');
    }
  }

};