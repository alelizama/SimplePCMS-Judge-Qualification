/**
* Score.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,

  attributes: {
    ownerID: {
      type: 'string',
      required: true
    },
    ownerUsername: {
      type: 'string',
      required: true
    },
    completed: {
      type: 'array'
      // ['problemID', 'problemID', ... ]
    },
    value: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};
