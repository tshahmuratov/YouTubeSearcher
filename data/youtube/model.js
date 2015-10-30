"use strict";

var YouTubeModel = function (view) {
	this.view = view;
	this.autoIncrementId = 0;
	this.videosArray = {};
	this.selectedVideos = {};
	this.urlFilter = {};
	
	this.getVideoForExport = function(id) {
		var video = this.videosArray[id];
		return {id: id, url: video.url, name: video.name};
	}
	
	this.addVideo = function(url, name, parentElement) {
		var id = this.autoIncrementId++;
		if (typeof(this.urlFilter[url]) != 'undefined') return null;
		this.urlFilter[url] = 1;
		this.videosArray[id] = {url: url, name: name, parentElement: parentElement};
		return this.getVideoForExport(id);
	}
	
	this.selectVideo = function(id) {
		console.log("selectVideo "+id);
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
			result.push(this.getVideoForExport(id));
		}
		return result;
	}
}