


module.exports =
{
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
