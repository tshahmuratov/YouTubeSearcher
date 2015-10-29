var Buttons = require('sdk/ui/button/action');
var Sidebars = require("sdk/ui/sidebar");
var UIControllerModule = require("./controller.ui.js");

var UIViewInit = function(uiController) {
	if (!(uiController instanceof uiController.constructor))
		throw "uiController of wrong type " + uiController.constructor;
	var that = this;
	var controller = uiController;
	
	var mainButtonClick = function() {
		controller.handleTabButtonClick();
		that.sidebarShow();
	}
	
	var mainButton = Buttons.ActionButton({
			id: "youtube-searcher",
			label: "Open YouTube Searcher",
			icon: {
				"16": "./img/yts-16.png",
				"24": "./img/yts-24.png",
				"32": "./img/yts-32.png",
				"64": "./img/yts-64.png"
			},
			onClick: mainButtonClick.bind(this)
		});

	var sidebar = Sidebars.Sidebar({
			id: 'youtube-searcher-sidebar',
			title: 'YouTube Searcher',
			url: "./sidebar.html"
		});
	
	this.sidebarShow = function() {
		sidebar.show();
	}
}

module.exports = UIViewInit;