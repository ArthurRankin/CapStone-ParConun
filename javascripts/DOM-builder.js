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
let threadHeader = (threadTitle) => {
    $('#description').html(`<u>${threadTitle}</u>`);
};


//THREAD BUILDER 
let threadBuilder = () => {
    let threads = "";
    db.getThreadData()
    .then((threadData) => {
        for (let item in threadData) {
            threads += `
                    <tbody>
                        <tr>
                            <th scope="row" id="thread-btn" class="${threadData[item].title}">${threadData[item].title}</th>
                            <td>${threadData[item].comments}</td>
                            <td>${threadData[item].name}</td>
                        </tr>
                    </tbody>`;


                $('#dom-updater').html(`
                <button type="button" id="add-convo" class="btn btn-primary btn-sm mb-5">Add Conversation</button>
                <table class="table table-striped table-bordered mb-5">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col"> # of comments </th>
                            <th scope="col"> User </th>
                        </tr>
                    </thead>
                    ${threads}
                </table>`);
        }
    }
);
};

        
        
        
        



//DOM UPDATE FOR "ADD CONVERSATION" PAGE
let postConvo = () => {
    $('#dom-updater').html(`
    <button type="button" id="post-convo" class="btn btn-primary btn-sm mb-3">Post conversation</button><br>
    <select name="select city" id="select-category" class="mb-3">
    
    </select><br>
    <input type="text" id="title-input" class="col-4 mb-3" placeholder="Title of Conversation"><br>
    <textarea value="Add Comment" rows="4" cols="50" id="comment-area" class="p-5 mb-5 mr-5">

    `);
};



//EMPTY VARIABLES FOR CATSELECTOR METHOD
let catD;
let catSelect;

//CATEGORY DROPDOWN
let catSelector = () => {
    db.getCategory()
    .then((catData) => {
        for (var i = 0; i < catData.length; i++) {
            catSelect += `<option value=${catData[i].id}>${catData[i].title}</option>`;
        }
        $('#select-category').html(catSelect);
    });
};




let convoPage = () => {
    let convo = "";
    
};





module.exports = {
    catTitleUpdate, 
    threadBuilder, 
    addPostHeader, 
    postConvo, 
    catSelector,
    threadHeader};