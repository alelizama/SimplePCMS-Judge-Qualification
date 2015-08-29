/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    // Yes res.login() you can check in responses/login.js
    return res.login({
      username: req.param('username'),
      password: req.param('password')
      });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    // It doesn't matter because you need to release the token in the client
    return res.ok('Bye')
  },

  definition: function(req, res) {
    res.json(User.definition);
  }

};
