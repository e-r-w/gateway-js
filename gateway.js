
class Gateway {
  constructor(){
    this.routes = [];
  }
  get(uri, options, handler) {
    this.routes.push({
      uri: uri,
      contentType: options.contentType,
      handler: handler,
      method: 'GET'
    });
    return this;
  }
}

module.exports = Gateway;