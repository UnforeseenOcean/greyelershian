// ==UserScript==
// @name         Twitter MicroMobile
// @namespace    http://voodoowarez.com/
// @version      1.0
// @description  Compactify Twittler mobile
// @author       rektide de la faye
// @match        https://mobile.twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
     // less padding in article
    GM_addStyle('div[role="artilce"] { padding: 0.2rem 0.5rem; };');
    GM_addStyle('._2wLtAyps, ._3hdqTVua>*, ._32ievKrg { margin-top: 0.3rem; };');
    GM_addStyle('.I8DvYjmD { padding: 0.3rem 0.656rem !important; };');
    GM_addStyle('._2wLtAyps, ._3hdqTVua>*, ._32ievKrg { margin-top: 0.3rem; };');
    // smaller images (WIP, not consistent)
    GM_addStyle('._2_y4lIt4, ._3i5pgeTp { width: 60%; };');
    // full width
    GM_addStyle('@media screen and (min-width:600px){ div._3xujJ3kq { max-width: none!important; };}');
    // de-bold names
    GM_addStyle('._3WJqTbOE { font-weight: normal; };');
    GM_addStyle('._2WpbeAAU, ._24u5-vsm { height: 0rem; };');
    // smaller nav icons
    GM_addStyle('._3XRskxP3 { font-size: 11px; };');
    // smaller nav
    GM_addStyle('._3VY1UWs3 { height: 2rem; };');
})();
