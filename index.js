
class Gateway {
  constructor(){
    this.routes = [];
  }
  get(uri, contentType, handler) {
    this.routes.push({
      uri: uri,
      contentType: contentType,
      handler: handler,
      method: 'GET'
    })
  }
}

module.exports = Gateway;