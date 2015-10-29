"use strict";

var YouTubeModel = function (view) {
	this.view = view;
	this.autoIncrementId = 0;
	this.videosArray = {};
	this.selectedVideos = {};
	this.urlFilter = {};
	
	this.addVideo = function(url, name, parentElement) {
		var id = this.autoIncrementId++;
		if (typeof(this.urlFilter[url]) != 'undefined') return;
		this.urlFilter[url] = 1;
		this.videosArray[id] = {url: url, name: name, parentElement: parentElement};
	}
	
	this.selectVideo = function(id) {
		this.selectedVideos[id] = 1;
		this.view.checkElement(this.videosArray[id].parentElement);
	}
	
	this.unselectVideo = function(id) {
		delete this.selectedVideos[id];
		this.view.uncheckElement(this.videosArray[id].parentElement);
	}
	
	this.unselectAllVideos = function() {
		for (var id in this.selectedVideos) {
			this.unselectVideo(id);
		}
	}
	
	this.getSelectedVideos = function() {
		var result = []
		for (var id in this.videosArray) {
			var desc = this.videosArray[id];
			result.push({id: id, url: desc.url, name: desc.name, parentElement: desc.parentElement});
		}
		return result;
	}
}