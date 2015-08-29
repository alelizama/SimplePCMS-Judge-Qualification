/**
 * isJudge
 *
 * @module      :: Policy
 * @description :: Checks if the request has a JWT obj and set the userID and userRole visible
 * @docs        :: docs/Auth.md
 *
 */
module.exports = function(req, res, next) {
  
  // The req.usr is created in jwtAuth policy
  if ( req.usr !== undefined && (req.usr.rol === 'admin' || req.usr.rol === 'judge')) {
    return next();
  }
  
  return res.forbidden();
};