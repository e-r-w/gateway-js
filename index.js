
class Gateway {
  constructor(options){
    this.routes = [];
    this.name = options.name;
    this.bucket = options.bucket;
    this.bucketKey = options.bucketKey;
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