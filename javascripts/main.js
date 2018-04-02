"use strict";

let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");



//GOOGLE LOGIN BUTTON
$("#login").click(function() {
    user.logInGoogle()
    .then((userData) => {
        db.checkUserFB(userData.user.displayName, userData.user.uid);
    });
    $('#login').addClass('hidden');
});


//0 - 6 MONTHS OLD CATEGORY BUTTON
$('#0months').click(function() {
    DOM.catTitleUpdate("0 - 6 months old");
    DOM.threadBuilder($('#0months').attr('name'));
    DOM.hideLogoDiv();
});

//6 MONTHS - 2 YEARS OLD CATEGORY BUTTON
$('#6months').click(function() {
    DOM.catTitleUpdate("6 months - 2 years old");
    DOM.threadBuilder($('#6months').attr('name'));
    DOM.hideLogoDiv();
});

//2 - 6 YEAR OLD CATEGORY BUTTON
$('#2yearOlds').click(function() {
    DOM.catTitleUpdate("2 Years - 6 Years");
    DOM.threadBuilder($('#2yearOlds').attr('name'));
    DOM.hideLogoDiv();
}); 

//6 - 12 YEAR OLD CATEGORY BUTTON
$('#6years').click(function() {
    DOM.catTitleUpdate("6 Years - 12 Years");
    DOM.threadBuilder($('#6years').attr('name'));
    DOM.hideLogoDiv();
}); 

//SPECIAL NEEDS CATEGORY BUTTON
$('#spec-needs').click(function() {
    DOM.catTitleUpdate("Special Needs");
    DOM.threadBuilder($('#spec-needs').attr('name'));
    DOM.hideLogoDiv();
}); 

//GENERAL CATEGORY BUTTON
$('#general').click(function() {
    DOM.catTitleUpdate("General");
    DOM.threadBuilder($('#general').attr('name'));
    DOM.hideLogoDiv();
}); 




//ADD CONVERSATION BUTTON
$('#dom-updater').on("click", '#add-convo', function() {
    let id = $('#add-convo').val();
    DOM.addPostHeader();
    DOM.postConvo(id); 
});


//POST THREAD TO FIREBASE VIA THE "POST CONVERSATION" BUTTON
$('#dom-updater').on("click", "#post-convo", function() {
    let category = $('#post-convo').val();
    let title = $('#title-input').val();
    let comments = $('#comment-area').val();
    db.addThread(db.buildThreadObj(category, title, user.getUserName()));
    db.getThreadData($('#post-convo').val())
    .then((threadData) => {
        console.log(threadData);
        let threadID = "";
        for (let item in threadData) {
            threadID = item;           
        }
        db.addComment(db.buildCommentObj(threadID, comments, user.getUserName(), user.getUser()));
        DOM.threadBuilder($('#post-convo').val());  
    }); 
});


//LOAD CONVERSATION PAGE VIA CLICKING ON THREADS
$('#dom-updater').on('click', '.thread-btn', function(event) {
    let val = event.currentTarget.attributes[2].value;
    DOM.threadHeader(val);
    console.log(val);
    DOM.convoPage(event.target.id);
});


//LOADS THE ADD COMMENT PAGE VIA THE ADD COMMENT BUTTON
$('#dom-updater').on('click', '#add-com', function(event) {
    let threadID = $('#add-com').val();
    let commentID = event.target;
    console.log('this is the threadID and commentID', threadID  );
    DOM.addCom(threadID);
    DOM.addComHeader();
});


//BUILDS AND POSTS THE COMMENT TO FIREBASE AND THEN LOADS THE CONVERSATION PAGE VIA THE POST COMMENT BUTTON
$('#dom-updater').on("click", "#post-com", function() {
    let comment = $('#comment-area').val();
    let threadID = $('#post-com').val();
    db.addComment(db.buildCommentObj(threadID, comment, user.getUserName(), user.getUser()))
    .then((data) => { 
        DOM.convoPage(threadID);
        DOM.threadHeader();
    });
});


//DELETES THE SELECTED COMMENT FROM FIREBASE AND LOADS THE CONVO PAGE WITH OUT THE COMMENT VIA DELETE BUTTON
$('#dom-updater').on("click", "#delete-btn", function(e) {
    let commentID = e.target.value;
    let threadID = $('#add-com').val();
    db.deleteComment(commentID)
    .then((taco) => { 
        DOM.convoPage(threadID);
    });
});


//EDIT THE SELECTED COMMENT VIA EDIT BUTTON AND RELOAD THE COMMENT PAGE
$('#dom-updater').on("click", "#edit-btn", function(event) {
    let val = $('#add-com').val();
    let title = event.target.value;
    //console.log('the edit comment button was clicked', event.target);
    DOM.editCom(val, title);
});


//USE THE POST COMMENT BUTTON TO EDIT YOUR COMMENT YOU SELECTED
$('#dom-updater').on("click", "#edit-com", function(e) {
    let commentID = e.target.name;    
    let comment = $('#comment-area').val();
    let threadID = $('#edit-com').val();
    db.editComment(db.buildCommentObj(threadID, comment, user.getUserName(), user.getUser()), commentID )
    .then((data) => { 
        DOM.convoPage(threadID);
        DOM.threadHeader();
    });
});



//SETTING UP THE HOME NAV BUTTON
$('#category-nav').on("click", function() {
    window.location.reload();
});