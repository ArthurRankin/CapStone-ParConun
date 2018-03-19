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



//PULLING DOWN CATEGORY JSON FROM FIREBASE TO USE
let getCategory = () => {
    return $.ajax({
      url: `${FBconfig.getFBsettings().databaseURL}/categories.json`
    }).done((data) => {
      return data;
    });
  
  };




//THREAD OBJECT BUILDER
let buildThreadObj = (catID, threadTitle, comment, userName) => {
    let threadObj = {
        id: catID,
        title: threadTitle,
        comments: comment,
        name: userName
    };
    return threadObj;
};


function addThread(threadObj) {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/threads.json`,
        type: 'POST',
        data: JSON.stringify(threadObj),
        dataType: 'json'
    }).done((threadData) => {
        return threadData;
    });
}


module.exports = {buildUserObj, addUser, getCategory, buildThreadObj, addThread};