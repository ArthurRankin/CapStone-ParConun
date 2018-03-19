"use strict";

let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");






//BUILDING THE USER OBJECT
let buildUserObj = (displayName) => {
    let userObj = {
        Name:displayName,
        uid: user.getUser()
    };
    return userObj;
};


//POSTING THE USER OBJECT TO FIREBASE
function addUser(userObj) {
	return $.ajax({
      url: `${FBconfig.getFBsettings().databaseURL}/users.json`,
      type: 'POST',
      data: JSON.stringify(userObj),
      dataType: 'json'
   }).done((userID) => {
      return userID;
   });
}



module.exports = {buildUserObj, addUser};