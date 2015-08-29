/**
 * 401 (unauthorized) Response
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(data);
 *
 * @param  {Object} data
 */

module.exports = function unauthorized (data) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.unauthorized() :: Sending 401 ("Unauthorized") response');

  // Set status code
  res.status(401);

  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON) {
    return res.jsonx(data);
  }
  
  return res.send('unathorized');
};
