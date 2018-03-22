"use strict";


let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");



//UPDATING THE TOP DIV DEPENDING ON CATEGORY CLICKED ON
let catTitleUpdate = (category) => {
    $('#description').html(`<u>${category}</u>`);
    $('#decrtiption').addClass('');
};


//"ADD CONVERSATION" TOP HEADER UPDATE
let addPostHeader = () => {
    $('#description').html(`<u>Add Conversation</u>`);
};

//UPDATING THE HEADER WHEN A THREAD IS CLICKED
let threadHeader = (title) => { 
    $('#description').html(`<u value='${title}' id='t-header'>${title}</u>`);
};

//UPDATES THE HEADER ON THE ADD COMMENT PAGE
let addComHeader = () => {
    $('#description').html(`<u>Add Comment</u>`);
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
                    convo += `<div class="border-bottom border-dark d-flex justify-content-between"  id="${comData[item].threadID}">`;
                    convo += `<div class="d-flex flex-row">`;
                    convo += `<h5 class="ml-2 mt-5 pb-4">${comData[item].name}</h6>`;
                    convo += `<p class="ml-5 pt-5 align-self-end">${comData[item].comments}<p>`;
                    convo += `</div>`;
                    if (comData[item].uid === currentuser) {
                    convo += `<button type="button" id="delete-btn" value="${comData[item].commentID}" class="btn btn-danger align-self-start mt-2">Delete</button>`;
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
let addCom = (value, title) => {
    console.log(value, title);
    $('#dom-updater').html(`
    <button type="button" value="${value}" name="${title}" id="post-com" class="btn btn-primary btn-sm mb-3">Post Comment</button><br>
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
    addComHeader
};