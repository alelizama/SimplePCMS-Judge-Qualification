/**
* Document.js
*
* @description :: A page or programming contest problem
* @docs        :: docs/?
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'page'    // page, problem, solution
    },
    content: {
      type: 'text',
      required: true
    },
    status: {
      type: 'string',
      defaultsTo: 'publish'
    },
    owner: {
      type: 'string'
    },
    ownerName: {
      type: 'string'
    },
    ownerScore: {
      type: 'integer',
      defaultsTo: 0
    },
    finalScore:
    {
      type: 'array',
      defaultsTo: []
      // [{judge: 'string', score: 'integer'}, ... ]
    },
    solution: {
      type: 'string'
    },
    // The proof of the urge of a refactor
    score: {
      type: 'integer',
      defaultsTo: 0
    },
    attachment: {
      type: 'array'
      // [{id: 'string', type: 'finalInput'}, ... ]
    },

    /*
    beforeCreate: function (inputs, next) {
      var err = null;

      if (inputs.type === 'problem') {
        if ( _.isEmpty(inputs.attachment)) {
          inputs.attachment = [{"content": ""},{"content": ""}];
        } else if (inputs.attachment.length < 2 ) {
          inputs.attachment[1] = {"content": ""};
        }
      }

      return next(err, inputs);
    },*/

    // We don't need to spit the solution right?
    toJSON: function () {
      var obj = this.toObject();
      if (obj.type === 'problem' && obj.attachment !== undefined)
        delete obj.attachment[1];

      if (obj.originalElement !== undefined)
        delete obj.originalElement;

      return obj;
    }
  }
};
