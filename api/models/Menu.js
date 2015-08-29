/**
* Menu.js
*
* @description :: The real name has to be Menu Item
* @docs        :: docs/?
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,
  
  attributes: {
    // Text to be displayed in menu
    displayName: {
      type: 'string',
      required: true
    },
    
    // Required rol to see this item
    requiredRol: {
      type: 'string',
      defaultsTo: 'guest'
    },
    
    // URL which point the menu item
    itemURL: {
      type: 'string',
      required: true
    },
    
    // ID of area which belongs this menu item
    displayArea: {
      type: 'string',
      defaultsTo: 'main'
    }
  }
};

