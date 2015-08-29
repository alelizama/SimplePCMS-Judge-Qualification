/**
 * MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    
    definition: function(req, res) {
        res.json(Menu.definition);
    }

};

