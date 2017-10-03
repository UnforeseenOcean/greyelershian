// ==UserScript==
// @name ThycoticSecretSeverDefuddle
// @description prevent Thycotic Secret Server from re-masking a password
// @match https://scrt.yoyodyne.net/*
// @downloadURL https://raw.github.com/rektide/greyelershian/master/thycotic-secret-server-defuddle.user.js
// ==/UserScript==
(function(){

function stopProp(e){
	e.stopPropagation()
}
document.body.addEventListener("mouseup",  stopProp, true);
document.body.addEventListener("mouseout", stopProp, true);

})();
