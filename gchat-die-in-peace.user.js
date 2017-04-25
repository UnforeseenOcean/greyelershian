// ==UserScript==
// @name GChatDieInPeace
// @description remove the warning that gchats will be killed & hangouts will takeover
// @match http://mail.google.com/*
// @match https://mail.google.com/*
// @downloadURL https://raw.github.com/rektide/greyelershian/master/gchat-die-in-peace.user.js
// ==/UserScript==
(function(){

// PHASE 0: seed

var yellow= "rgb(255, 255, 204)"

// PHASE 1: find the responsible CSS rules

var some= Array.prototype.forEach
function findRules(key,value){
	var rv= []
	function matchRule(rule){
		for(var i= 0; i< rule.style.length; ++i){
			var name= rule.style[i]
			if(name == key && rule.style[name].toLowerCase().indexOf(value) != -1)
			{
				rv.push(rule)
				return true
			}
		}
	}
	function matchMeta(meta){
		if(meta.style)
			return matchRule(meta)
		else if(meta.cssRules)
			return some.call(meta.cssRules,matchMeta)
		else
			console.log("what is this?",meta)
	}
	function sheetRuleCheck(sheet){
		if(sheet&& sheet.rules){
			return some.call(sheet.rules,matchMeta)
		}
	}
	some.call(document.styleSheets,sheetRuleCheck)
	return rv.length? rv: null
}

setTimeout(function(){
	var rules= findRules("background-color",yellow)
	if(!rules){
		console.error("could not find a yellow death note")
	}else{
		for(var rule of rules){
			// PHASE 2: retrieve the relevant elements
			var deathNote= document.querySelector(rule.selectorText)
	
			// PHASE 3: remove element
			if(deathNote){
				deathNote.remove()
			}
		}
	}
}, 15000)

})();
