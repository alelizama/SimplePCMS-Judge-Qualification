/**
 * SolutionController
 *
 * @description :: Server-side logic for managing solutions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  definition: function(req, res) {
    res.json(Document.definition);
  },

  index: function(req, res) {
    res.badRequest();
  },

  list: function(req, res) {
    if( User.isJudge( req.usr ) ) {
      // List all
    } else {
      // List "yours"
    }

  },

  submit:  function (req, res) {
    var params = req.allParams();
    var usrID = req.usr !== undefined ? req.usr.id : 0;
    var usrNick = req.usr !== undefined ? req.usr.name : 'ghost';
    var jsdiff = require('diff');
    var stat = "";

    sails.log.debug("let's see \n", params);
    Document.findOne({
      id: params.problemID
    }).exec(function(err, problemDoc){
      if (err) res.negotiate(err);

    User.findOne({
      id: usrID
    }).exec(function(err, user)
    {
      if ( err) res.negotiate(err);

      //TODO: Rewrite this into Model logic (but later)
      var spectedOutput = problemDoc.attachment.length > 1 ? problemDoc.attachment[1].content : ""
          , diff = jsdiff.diffLines(spectedOutput, params.output.trim())
          , ok = true;

      sails.log.debug("Spected: \n", spectedOutput);
      sails.log.debug("Submited: \n", params.output);

      ok = diff.every(function(part){
        sails.log.silly("Part added: ", part.added);
        sails.log.silly("Part removed: ", part.removed);
        sails.log.silly("Part content: ", part.value);

        return !(part.added || part.removed);
      });

      sails.log.debug('problem submition, sucess: ', ok);

        Score.findOne({'ownerID': usrID}).exec(function(err, score){
          if (err) res.negotiate(err);

          if(_.isEmpty(score))
          {
            sails.log.silly('score doesn\'t exists. CREATE');
            Score.create({
              'ownerID': usrID,
              'ownerUsername': usrNick,
              'completed': [problemDoc.id],
              'value': problemDoc.score
            }).exec(function(err, score){
              if (err) sails.log.error('[Score] Failed create', err);

              if( ok )
              {
                res.ok({'type': 'success', 'msg': 'Congratulations. Your solution is alright!'});
              }
              else
              {
                res.ok({'type': 'danger', 'msg': 'Sorry, but your solution is not right!'});
              }
            });

            if(ok)
            {
              stat = "success";
            }
            else
            {
              stat = "failure";
            }
            Document.create({
              title: problemDoc.title ,
              type: 'code',
              score: problemDoc.score,
              content: params.code,
              solution: problemDoc.solution,
              owner: usrID,
              ownerName: user.username,
              status: stat
            }).exec(function(err, doc){
              if (err) sails.log.error('[Document:code] Creation failed', err);
            });

          } else {
            sails.log.debug('score exists. UPDATE');
            if ( !_.contains(score.completed, problemDoc.id) ) {
              Score.native(function(err, collection){
                if (err) sails.log.error('Error with Score.native()', err);

                var ObjectID = require('mongodb').ObjectID;

                collection.update({'_id': new ObjectID(score.id) },{
                  $push : {'completed': problemDoc.id},
                  $inc: {'value': problemDoc.score}
                }, {w:1}, function(err, something){
                  if (err) sails.log.error('[Score] Failed update', err);
                  sails.log.debug(something);

                  if( ok )
                  {
                    res.ok({'type': 'success', 'msg': 'Congratulations. Your solution is alright!'});
                  }
                  else
                  {
                    res.ok({'type': 'danger', 'msg': 'Sorry, but your solution is not right!'});
                  }
                });
              });
              if(ok)
              {
                stat = "success";
              }
              else
              {
                stat = "failure";
              }
              Document.create({
                title: problemDoc.title ,
                type: 'code',
                score: problemDoc.score,
                content: params.code,
                solution: problemDoc.solution,
                owner: usrID,
                ownerName: user.username,
                status: stat
              }).exec(function(err, doc){
                if (err) sails.log.error('[Document:code] Creation failed', err);
              });
            }
            else
            {
              //Cheating!
              res.ok({'type': 'warning', msg:'Hey! You already upload a solution!'});
            }
          }
        });
    });
    });
  }

};
