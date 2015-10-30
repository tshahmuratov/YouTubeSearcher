var UIControllerModule = require("./controller.ui.js");
var TabControllerModule = require("./controller.tab.js");

var TabSidebarMediator = function(uiController, tabController) {
	tabController.initMediator(this);
	uiController.initMediator(this);
	
	this.tabController = tabController;
	this.uiController = uiController;
	
	this.mainButtonClickNotify = function() {
		this.tabController.prepareActiveTab();
	}
	
	this.youTubeListChangedNotify = function(message) {
		this.uiController.sendTabList(message);
	}
	
	this.sidebarSelectionChangedNotify = function(message) {
		console.log("sidebarSelectionChangedNotify");
		this.tabController.sendSidebarSelection(message);
	}
}

module.exports = TabSidebarMediator;