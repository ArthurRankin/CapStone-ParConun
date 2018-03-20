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
let addUser = (userObj) => {
	return $.ajax({
      url: `${FBconfig.getFBsettings().databaseURL}/users.json`,
      type: 'POST',
      data: JSON.stringify(userObj),
      dataType: 'json'
   }).done((userID) => {
      return userID;
   });
};



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
        categoryID: catID,
        title: threadTitle,
        comments: comment,
        name: userName
    };
    return threadObj;
};






//USES THE BUILD THREAD OBJECT METHOD AND POSTS IT TO FIRESBASE
let addThread = (threadObj) => {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/threads.json`,
        type: 'POST',
        data: JSON.stringify(threadObj),
        dataType: 'json'
    }).done((threadData) => {
        return threadData;
    });
};



//USED TO PULL DOWN THE THREADS DATA TO POPULATE THE DOM
let getThreadData = () => {
     return $.ajax({
         url: `${FBconfig.getFBsettings().databaseURL}/threads.json`
     }).done((threadData) => {
         return threadData;

    });
 };



 //BUILDING THE COMMENTS OBJECT
 let buildCommentObj = (thread, comment, userName) => {
    let commentObj = {
        threadID: thread,
        comments: comment,
        name: userName
    };
    return commentObj;
 };


//POSTING THE COMMENTS TO FIREBASE FOR SAVING AND LATER USE
let addComment = (commentObj) => {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/comments.json`,
        type: 'POST',
        data: JSON.stringify(commentObj),
        dataType: 'json'
    }).done((commentData) => {
        return commentData;
    });
};



let getComData = () => {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/comments.json`
    }).done((comData) => {
        return comData;

   });
};




module.exports = {
    buildUserObj,
    addUser,
    getCategory, 
    buildThreadObj, 
    addThread, 
    getThreadData, 
    buildCommentObj, 
    addComment,
    getComData};