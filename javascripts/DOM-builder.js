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


//THREAD BUILDER 
let threadBuilder = () => {
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
        <tbody>
            <tr>
                <th scope="row">Socializing</th>
                <td>4</td>
                <td>Arthur Smith</td>
            </tr>
        </tbody>
    </table>`);
};




//"ADD CONVERSATION" TOP HEADER UPDATE
let addPostHeader = () => {
    $('#description').html(`<u>Add Conversation</u>`);
};



//DOM UPDATE FOR "ADD CONVERSATION" PAGE
let postConvo = () => {
    $('#dom-updater').html(`
    <button type="button" id="add-convo" class="btn btn-primary btn-sm mb-5">Post conversation</button>
    `);
};







module.exports = {catTitleUpdate, threadBuilder, addPostHeader};