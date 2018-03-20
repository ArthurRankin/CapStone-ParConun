"use strict";

let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");



//GOOGLE LOGIN
$("#login").click(function() {
    console.log("clicked auth");
    user.logInGoogle()
    .then((userData) => {
        console.log(userData);
        db.addUser(db.buildUserObj(userData.user.displayName));
    });
});


//SPECIAL NEEDS CATEGORY BUTTON
$('#spec-needs').click(function() {
    DOM.catTitleUpdate("Special Needs");
    DOM.threadBuilder();
}); 


//ADD CONVERSATION BUTTON
$('#dom-updater').on("click", '#add-convo', function() {
    DOM.addPostHeader();
    DOM.postConvo();
    db.getCategory()
    .then((catData) => {
        DOM.catSelector();
    });
    
});




//POST THREAD TO FIREBASE VIA THE "POST CONVERSATION" BUTTON
$('#dom-updater').on("click", "#post-convo", function() {
    let category = $('#select-category').val();
    let title = $('#title-input').val();
    let comments = $('#comment-area').val();
    db.addThread(db.buildThreadObj(category, title, comments, user.getUserName()));

    db.getThreadData()
    .then((threadData) => {
        console.log(threadData);
        let threadID = "";
        for (let item in threadData) {
            threadID = item;           
        }
        db.addComment(db.buildCommentObj(threadID, comments, user.getUserName()));
    }); 
    DOM.threadBuilder();  
});


//GOT TO CONVERSATION PAGE VIA CLICKING ON THREADS
$('#dom-updater').on('click', '.thread-btn', function() {
    DOM.threadHeader($('.thread-btn').text());
    DOM.convoPage(event.target.id);

});


$('#dom-updater').on('click', '#add-com', function() {
    DOM.addCom();
    DOM.addComHeader();
});


$('#dom-updater').on("click", "#post-com", function() {
      
});