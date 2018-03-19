"use strict";



//install firebase into lib folder npm install firebase --save
var firebase = require("./fb-config"),
	 provider = new firebase.auth.GoogleAuthProvider(),
	 currentUser = null,
	 currentUserName = null;

//listen for changed state
firebase.auth().onAuthStateChanged((user) => {
	if (user){
		currentUser = user.uid;
		currentUserName = user.displayName;
	}else {
		currentUser = null;
	}
});

function logInGoogle() {
	//all firebase functions return a promise!! Add a then when called

	return firebase.auth().signInWithPopup(provider);
}

function logOut(){
	return firebase.auth().signOut();
}
function getUser(){
	return currentUser;
}

function setUser(val){
	currentUser = val;
}

let getUserName = () =>{
	return currentUserName;
};

module.exports = {logInGoogle, logOut, getUser, setUser, getUserName};