'use strict';
const adapter = require('../adapters/cf');

class CfDriver {
  constructor(options){
    this.config = options;
  }
  generate(app){
    return new Promise( (resolve, reject) => {
      const result = adapter.handle(app, this.config);
      resolve(result);
    });
  }
}

module.exports = CfDriver;