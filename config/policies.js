/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/jwtAuth.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "jwtAuth")
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  //'*': true,
  UserController: {
    '*': false,
    'login': 'gossipStone',
    'logout': 'gossipStone',
    'definition': true,
    'find': true,
    'update': ['jwtAuth','isAdmin'],
    'create': ['jwtAuth','isAdmin'],
    'destroy': ['jwtAuth','isAdmin']
  },

  DocumentController: {
    '*': false,
    'definition': true,
    'list': 'jwtCheck',
    'update': ['jwtAuth','isJudge'],
    'create': ['jwtAuth','isAdmin'],
    'destroy': ['jwtAuth','isAdmin']
  },

  SolutionController: {
    '*': false,
    'definition': true,
    'list': true,
    'submit': ['jwtAuth'],
    'find': ['jwtAuth','isJudge'],
    'update': ['jwtAuth','isJudge'],
    'create': ['jwtAuth','isAdmin'],
    'destroy': ['jwtAuth','isAdmin']
  },

  ScoreController: {
    '*': true,
    'update': ['jwtAuth','isJudge'],
    'create': ['jwtAuth','isAdmin'],
    'destroy': ['jwtAuth','isAdmin']
  }
};
