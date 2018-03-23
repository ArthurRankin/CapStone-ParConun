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
let buildThreadObj = (catID, threadTitle, userName) => {
    let threadObj = {
        categoryID: catID,
        title: threadTitle,
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
        console.log(threadData);
        let FBobj = 
        {
            threadID: threadData.name
        };
        addFBkeys(FBobj, "threads", threadData.name);
        //return threadData;
    });
};


//SHOVES OBJECTS OWN GOOGLE ID INTO ITS SELF FOR LATER USE
function addFBkeys(object, element, FBkey) {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/${element}/${FBkey}.json`,
        type: 'PATCH',
        data: JSON.stringify(object),
        dataType: 'json'
    });
}


//USED TO PULL DOWN THE THREADS DATA TO POPULATE THE DOM
let getThreadData = (categoryID) => {
     return $.ajax({
         url: `${FBconfig.getFBsettings().databaseURL}/threads.json?orderBy="categoryID"&equalTo="${categoryID}"`
     }).done((threadData) => {
         return threadData;
    });
};



 //BUILDING THE COMMENTS OBJECT
 let buildCommentObj = (thread, comment, userName, userID) => {
    let commentObj = {
        threadID: thread,
        comments: comment,
        name: userName,
        uid: userID
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
        //console.log(commentData.name);
        let FBobj = 
        {
            commentID: commentData.name
        };
        addFBkeys(FBobj, "comments", commentData.name);
    });
};


//PULLING DOWN COMMENT DATA TO POPULATE DOM
let getComData = (threadID) => {
    return $.ajax({
        url: `${FBconfig.getFBsettings().databaseURL}/comments.json?orderBy="threadID"&equalTo="${threadID}"`
    }).done((comData) => {
        return comData;

   });
};


//UESES THE COMMENT ID TO DELETE THE COMMENT BELONGING TO IT
function deleteComment(commentID) {
    console.log("commentID", commentID);
    return $.ajax({
      url: `${FBconfig.getFBsettings().databaseURL}/comments/${commentID}.json`,
      method: 'DELETE'
    });
}

//USES THE COMMENT IF TO EDIT THE COMMENT 
function editComment(commentObj, commentId) {
    return $.ajax({
      url:`${FBconfig.getFBsettings().databaseURL}/comments/${commentId}/.json`,
      type:'PATCH',
      data: JSON.stringify(commentObj)
    }).done((data) => {
      return data;
    });
  }



module.exports = {
    buildUserObj,
    addUser,
    getCategory, 
    buildThreadObj, 
    addThread, 
    getThreadData, 
    buildCommentObj, 
    addComment,
    getComData,
    deleteComment,
    editComment};