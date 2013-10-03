// ==UserScript==
// @name Greyelershian
// @description a more sedate notification label on Google sites
// @match http://*.google.com/*
// @match https://*.google.com/*
// @downloadURL https://raw.github.com/rektide/greyelershian/master/greyelershian.user.js
// ==/UserScript==
(function(){

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
var rule= findRule("background-color","rgb(203, 68, 55)")
if(!rule){
	console.error("could not find a red notification label")
	return
}

// PHASE 2: retrieve the relevant elements

var label= document.querySelector(rule.selectorText),
  link= label.parentNode,
  bar= link.parentNode.parentNode.parentNode.parentNode.parentNode

// PHASE 3: pull their classes and colors (we seeded this far from label's red)

function _makeExtractProperty(property){
	return function _extractProperty(val,key,arr){
		return val?val[property]:undefined
	}
}

var colors= {},
  classes= {};
(function(){
	var _set= [label, link, bar],
	  _names= ["label", "link", "bar"],
	  _colors= _set.map(window.getComputedStyle).map(_makeExtractProperty("background-color")),
	  _classes= _set.map(_makeExtractProperty("classList")).map(_makeExtractProperty(0))
	for(var i in _set){
		colors[_names[i]]= _colors[i]
		classes[_names[i]] = _classes[i]
	}
})()

// PHASE 4: append a stylesheet

// DOMfunky https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.insertRule
var styleSheet= document.createElement("style")
styleSheet.type = "text/css"
styleSheet.id= "greyelershianSheet"
document.body.appendChild(styleSheet)

// PHASE 5: add new rules

styleSheet= styleSheet.sheet
var rules= [
  "."+classes.label+" {background-color:"+colors.bar+"; transition:background-color 0.8s ease-out}",
  "."+classes.link+":hover ."+classes.label+" {background-color:"+colors.label+"}"
]
rules.forEach(function(rule){
	styleSheet.insertRule(rule,0)
})

})()
