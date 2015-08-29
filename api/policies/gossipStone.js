/**
 * gossip
 *
 * @module      :: Policy
 * @description :: Just for dev purposes
 * @docs        :: docs/?
 *
 */
module.exports = function(req, res, next) {
  var jwt = require('jwt-simple')
    , token = req.get('Authorization')
    , usr = null;
  
  sails.log.debug('AUTH: ', req.get('Authorization'));
  
  if (token !== undefined) {
    usr = jwt.decode(token, sails.config.globals.jwtSecret, 'HS512');
    sails.log.debug('ID: ', usr.id);
    sails.log.debug('ROL: ', usr.rol);
    sails.log.debug('NICK: ', usr.name);
  }
  
  return next();
};