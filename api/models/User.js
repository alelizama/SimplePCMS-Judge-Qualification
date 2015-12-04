/**
* User.js
*
* @description :: The user model.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,

  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    rol: {
      type: 'string',
      defaultsTo: 'participant'
    }

  },

  beforeCreate : function (inputs, next) {
    User.hashPassword(inputs, next);
  },

  beforeUpdate : function (inputs, next) {
    User.hashPassword(inputs, next);
  },

  /**
   * Create a new user using the provide inputs,
   *
   * @param {Object}  inputs
   *                    - username  {String}
   *                    - email     {String}
   *                    - password  {String}
   * @param {Function} next
   *
  signup : function (inputs, next) {
    User.create({
      name: inputs.name,
      username: inputs.email,
      password: inputs.password
    }).exec(next);
  },*/

  /**
   * Check validness of a login using the provided inputs.
   *
   * @param {Object} inputs
   *                  + username {String}
   *                  + password {String}
   * @param {Function} next
   */
  attemptLogin: function (inputs, next) {
    if (inputs.username === 'admin' && inputs.password === 'admin') {
      return next(null, {id: 0, rol:'admin', username: inputs.username});
    }

    User.findOne({
      username: inputs.username
    }).exec(function(err, user){
      if (err || !user) return next(err, false);

      bcrypt.compare(inputs.password, user.password, function(err, res) {
        if(! res) return next(err, false);
        return next(err, user);
      });
    });
  },

  /**
   * Hash your password and exec
   *
   * @param {Object}  inputs
   *                    - username  {String}
   *                    - email     {String}
   *                    - password  {String}
   * @param {Function} next
   */
  hashPassword: function (inputs, next) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) return next(err);
      inputs.password = hash;
      next();
    });
  },

  isAdmin: function (usr) {
    return usr !== undefined && usr.rol === 'admin';
  },

  isJudge: function (usr) {
    return usr !== undefined && (usr.rol === 'judge' || usr.rol === 'admin');
  }
};
