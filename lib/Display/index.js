  module.exports = require('./Ncurses');
if(typeof window == 'object') {
  module.exports = require('./Canvas');
}
