module.exports = process.env.TETRINODE_COV ?
    require('./lib-cov') :
    require('./lib');
