/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Give the (Model) object definition to the frontend
   */
  definition: function(req, res) {
    res.json(Document.definition);
  },

  /**
   * Change the default behavioar of "list"
   */ 
  list: function(req, res)
  {
    Document.find({
      '$or' : [
        {'type': 'page'},
          {'type': 'code'},
        {'type': 'problem'}
      ]
    }).exec(function(err, data) {
      if (err) res.negotiate(err);

      var usrID = req.usr!== undefined ? req.usr.id : 0;

      Score.findOne({'ownerID': usrID }).exec(function(err, score){
        if (err) res.negotiate(err);

        if(!_.isEmpty(score)) {
          _.each(data, function(doc, i){
            if ( doc.type === 'problem' ){
              doc.status = _.contains(score.success, doc.id) ? 'solved' : '';
            }
          });
        }

        res.json(data);
      });

    });
  }
};
