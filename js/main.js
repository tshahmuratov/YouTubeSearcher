var Main = function(url, tabScriptList, sidebarScriptList){    
	this.UIViewModule = require("./view.ui.js");
	this.UIControllerModule = require("./controller.ui.js");
	this.TabControllerModule = require("./controller.tab.js");
	this.TabUIMediatorModule = require("./tab.ui.mediator.js");
	
	this.uiView = new this.UIViewModule();
	this.uiController = new this.UIControllerModule(this.uiView, sidebarScriptList);
	this.tabController = new this.TabControllerModule(url, tabScriptList);
	this.mediator = new this.TabUIMediatorModule(this.uiController, this.tabController);
	
	this.tabController.initTabListener();
	this.uiController.initView();
}

module.exports = Main;