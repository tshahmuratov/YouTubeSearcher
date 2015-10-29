"use strict";

var YouTubeView = function () {
	this.checkElement = function(elem) {
		elem.classList.add('youtubeSearcherSelected');
	}
	
	this.uncheckElement = function(elem) {
		elem.classList.remove('youtubeSearcherSelected');
	}
	
	this.init = function() {
		//create css class
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.youtubeSearcherSelected { border-color: red; }';
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}