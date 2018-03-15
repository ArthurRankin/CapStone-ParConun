"use strict";
console.log('we all set up on main');

let FBkeys = require("./FB-key"),
    FBconfig = require("./FB-config"),
    user = require("./user");

console.log('getKey method', FBkeys.getKey());
