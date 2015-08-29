/**
 * jwtCheck
 *
 * @module      :: Policy
 * @description :: Checks if the request has a JWT obj and set the userID and userRole visible
 * @docs        :: docs/Auth.md
 *
 */
module.exports = function(req, res, next) {

  // Every token should have a JWT token into its header
  var token = req.get('Authorization');
  
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (token) {
    var jwt = require('jwt-simple');
    var usr = jwt.decode(token, sails.config.globals.jwtSecret, 'HS512');
    
    req.usr = usr;
    sails.log.debug('Auth jwt:\n', usr);
  }

  // Authenticated or not here we go
  return next();
};