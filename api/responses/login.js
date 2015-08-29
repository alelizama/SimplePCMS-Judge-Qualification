/**
* res.login([inputs])
*
* @param {String} inputs.username
* @param {String} inputs.password
*
* @description :: Log the requesting user in using a passport strategy
*/
module.exports = function login(inputs) {
  inputs = inputs || {};
  
  var req = this.req;
  var res = this.res;
  
  User.attemptLogin({
    username: inputs.username,
    password: inputs.password
  }, function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) {
      return res.badRequest('Invalid username/password combination.');
    }
    
    var usr = {
      id: user.id,
      rol: user.rol,
      name: user.username
    }
    
    var jwt = require('jwt-simple');
    var token = jwt.encode(usr, sails.config.globals.jwtSecret, 'HS512');
    
    return res.ok({token: token});
  });
};