var Buttons = require('sdk/ui/button/action');
var Sidebars = require("sdk/ui/sidebar");
var UIControllerModule = require("./controller.ui.js");

var UIView = function() {
	this.sidebar;
	this.mainButton;
	
	this.createSidebar = function(sidebarOnReady) {
		this.sidebar = Sidebars.Sidebar({
			id: 'youtube-searcher-sidebar',
			title: 'YouTube Searcher',
			url: "./sidebar.html",
			onReady: sidebarOnReady
		});
	}
	
	this.createButton = function(buttonOnClick) {
		this.mainButton = Buttons.ActionButton({
			id: "youtube-searcher",
			label: "Open YouTube Searcher",
			icon: {
				"16": "./img/yts-16.png",
				"24": "./img/yts-24.png",
				"32": "./img/yts-32.png",
				"64": "./img/yts-64.png"
			},
			onClick: buttonOnClick
		});
	}
	
	this.sidebarShow = function() {
		this.sidebar.show();
	}
}

module.exports = UIView;