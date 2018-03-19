"use strict";


let FBkeys = require("./fb-key"),
    FBconfig = require("./fb-config"),
    user = require("./user"),
    DOM = require("./DOM-builder"),
    db = require("./db-interaction"),
    helper = require("./helper");




let topDivPara = (category) => {
    $('#description').html(`<u>${category}</u>`);
    $('#decrtiption').addClass('');
};











module.exports = {topDivPara};