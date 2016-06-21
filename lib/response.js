'use strict';
const EventEmitter = require('events');

class Response extends EventEmitter {
  constructor(){
    super();
    this.statusCode = 200;
  }
  send(data){
    this.emit('end', data);
  }
  status(code) {
    this.statusCode = code;
    return this;
  }
}

module.exports = Response;