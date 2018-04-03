"use strict";


let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");

let hideLogoDiv = () => {
    $('#logo-div').html('').addClass('hidden');
};

//UPDATING THE TOP DIV DEPENDING ON CATEGORY CLICKED ON
let catTitleUpdate = (category) => {
    $('#description').html(`<h2>${category}</h2>`);
    $('#decrtiption').addClass('');
};


//"ADD CONVERSATION" TOP HEADER UPDATE
let addPostHeader = () => {
    $('#description').html(`<h2>Add Conversation</h2>`);
};

//UPDATING THE HEADER WHEN A THREAD IS CLICKED
let threadHeader = (title) => { 
    $('#description').html(`
    <h2 value='${title}' class="pt-3" id='t-header'>${title}</h2>
    <hr width="200%" height="2px" noshade>`);
    $('#description-div').removeClass('justify-content-center text-center').addClass('container p-2 justify-content-start');
    $('#how-to').html("").removeClass();
};

//UPDATES THE HEADER ON THE ADD COMMENT PAGE
let addComHeader = () => {
    $('#description').html(`<h2>Add Comment</h2>`);
};

let editComHeader = () => {
    $('#description').html(`<h2>Edit Comment</h2>`);
};





//BUILDING THE THREAD PAGE 
let threadBuilder = (ID) => {
    let threads = "";
    db.getThreadData(ID)
        .then((threadData) => {
            for (let item in threadData) {
                if (ID === threadData[item].categoryID) {
                    threads += `
                    <tbody>
                        <tr>
                            <th id="${item}" scope="row" value="${threadData[item].title}" class="thread-btn">${threadData[item].title}</th>
                            <td>${threadData[item].name}</td>
                        </tr>
                    </tbody>`;
                } else {
                    threads = `<p>No Conversations Yet! Add One!!</p>`;
                }
            }


            $('#dom-updater').html(`
            <button type="button" id="add-convo" value="${ID}" class="btn btn-primary btn-sm mb-5">Add Conversation</button>
            <table class="table table-striped table-bordered mb-5">
            <thead class="thead-dark">
            <tr>
            <th scope="col">Conversation Title</th>
            <th scope="col"> User </th>
            </tr>
            </thead>
            ${threads}
            </table>`);
        });
};




//DOM UPDATE FOR THE ADD CONVERSATION PAGE
let postConvo = (categoryid) => {
    $('#dom-updater').html(`
    <button type="button" id="post-convo" value="${categoryid}" class="btn btn-primary btn-sm mb-3">Post Conversation</button><br>
    
    <input type="text" id="title-input" class="col-4 mb-3" placeholder="Title of Conversation"><br>
    <div class="form-group">
        <textarea class="form-control" id="comment-area" rows="3"></textarea>
    </div>


    `);
};



//BUILDS THE CONVERSATION PAGE
let convoPage = (tID, title) => {
    let convo = "";
    db.getComData(tID)
        .then((comData) => {
            for (let item in comData) {
                let currentuser = user.getUser();
                //console.log('this is the commentID', comData[item].commentID);
                if (tID === comData[item].threadID) {
                    convo += `<div class="border-bottom border-dark d-flex flex-column mb-2 pt-5"  id="${comData[item].threadID}">`;
                    convo +=    `<div class="d-flex flex-column">`;
                    convo +=        `<h5 id="convo-user" class="pb-3">${comData[item].name}</h5>`;
                    convo +=        `<p id="convo-paras" class="pt-3 pb-2">${comData[item].comments}<p>`;
                    convo +=    `</div>`;
                    if (comData[item].uid === currentuser) {
                    convo +=    `<div class="d-flex flex-row">`;
                    convo +=        `<div class="p-2">`;
                    convo +=            `<button type="button" id="delete-btn" value="${comData[item].commentID}" class="change-btn p-2 btn btn-danger align-self-end mt-1">Delete</button>`;
                    convo +=        `</div>`;
                    convo +=        `<div class="p-2">`;
                    convo +=            `<button type="button" id="edit-btn" value="${comData[item].commentID}" class="change-btn p-2 btn btn-secondary align-self-start mt-1">Edit Comment</button>`; 
                    convo +=        `</div>`; 
                    convo +=    `</div>`;
                    }
                    convo += `</div>`;
                } else if (comData === 0) {
                    convo = `no comments yet`;
                }
                $('#dom-updater').html(`
            <button type="button" id="add-com" value="${tID}" name="${title}" class="btn btn-primary btn-sm mb-5">Add Comment</button><br>
            ${convo}
            `);
            }
        });
};



//SHOWS THE ADD COMMENT PAGE WHEN "ADD COMMENT" IS CLICKED
let addCom = (threadID, threadTitle) => {
    $('#dom-updater').html(`
    <button type="button" value="${threadID}" name="${threadTitle}" id="post-com" class="btn btn-primary btn-sm mb-3">Post Comment</button><br>
    <div class="form-group">
        <textarea class="form-control" id="comment-area" rows="3"></textarea>
    </div>

    `);
};


let editCom = (commentID, title) => {
    $('#dom-updater').html(`
    <button type="button" value="${commentID}" name="${title}" id="edit-com" class="btn btn-primary btn-sm mb-3">Edit Comment</button><br>
    <div class="form-group">
        <textarea class="form-control" id="comment-area" rows="3"></textarea>
    </div>

    `);
};





module.exports = {
    catTitleUpdate,
    threadBuilder,
    addPostHeader,
    postConvo,
    threadHeader,
    convoPage,
    addCom,
    addComHeader,
    editCom,
    hideLogoDiv,
};