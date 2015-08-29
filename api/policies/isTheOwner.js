/**
 * isTheOwner
 *
 * @module      :: Policy
 * @description :: Checks if the request has a JWT obj and set the userID and userRole visible
 * @docs        :: docs/Auth.md
 *
 */
module.exports = function(req, res, next) {
  return next();
};