if (process.env.NODE_ENV != 'test') {
  module.exports = require('./Charm');
}
if(typeof window == 'object') {
  module.exports = require('./Canvas');
}
