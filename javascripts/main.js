"use strict";
console.log('we all set up on main');

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
    });
});

