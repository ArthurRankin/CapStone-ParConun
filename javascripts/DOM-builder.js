"use strict";


let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");



//UPDATING THE TOP DIV DEPENDING ON CATEGORY CLICKED ON
let topDivPara = (category) => {
    $('#description').html(`<u>${category}</u>`);
    $('#decrtiption').addClass('');
};


let threadBuilder = () => {
    $('#dom-updater').html(`
    <button type="button" class="btn btn-primary btn-sm ">Add Conversation</button>
    <table class="table table-striped table-bordered mb-5">
    <thead class="thead-dark">
      <tr>
        <th scope="col"># of comments</th>
        <th scope="col"> title </th>
        <th scope="col"> User </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Socializing</td>
        <td>Arthur Smith</td>
      </tr>
    </tbody>
  </table>`);
};










module.exports = {topDivPara, threadBuilder};