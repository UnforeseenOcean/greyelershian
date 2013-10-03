// ==UserScript==
// @name Greyelershian
// @description a more sedate notification label on Google sites
// @match http://*.google.com/*
// @match https://*.google.com/*
// @downloadURL https://raw.github.com/rektide/greyelershian/master/greyelershian.user.js
// ==/UserScript==
(function(){

// PHASE 0: seed

var red= "rgb(203, 68, 55)"

// PHASE 1: find the responsible CSS rules

var some= Array.prototype.some
function findRule(key,value){
	var rv
	function matchRule(rule){
		for(var i= 0; i< rule.style.length; ++i){
			var name= rule.style[i]
			if(name == key && rule.style[name].toLowerCase().indexOf(value) != -1)
			{
				rv= rule
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
	some.call(document.styleSheets,function(sheet){return some.call(sheet.rules,matchMeta)})
	return rv
}
var rule= findRule("background-color",red)
if(!rule){
	console.error("could not find a red notification label")
	return
}

// PHASE 2: retrieve the relevant elements

var label= document.querySelector(rule.selectorText),
  link= label.parentNode,
  previous= label.previousSibling

// PHASE 4: append a stylesheet

// DOMfunky https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.insertRule
var styleSheet= document.createElement("style")
styleSheet.type = "text/css"
styleSheet.id= "greyelershianSheet"
document.body.appendChild(styleSheet)

// PHASE 5: add new rules

var grey= window.getComputedStyle(previous)["color"],
  classLink= link.classList[0],
  classLabel= label.classList[0]

grey= "rgba("+grey.substring(4,grey.length-1)+", 0.3236)"

styleSheet= styleSheet.sheet
var rules= [
  "."+classLabel+" {background-color:"+grey+"; transition:background-color 0.8s ease-out}",
  "."+classLink+":hover ."+classLabel+" {background-color:"+red+"}"
]
rules.forEach(function(rule){
	styleSheet.insertRule(rule,0)
})

})()
