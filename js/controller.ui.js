var Buttons = require('sdk/ui/button/action');
var Sidebars = require("sdk/ui/sidebar");
var UIControllerModule = require("./controller.ui.js");

var UIController = function(uiView) {
	this.uiView = uiView;
	this.mediator;
	this.sidebarWorker;
	
	this.sidebarWorkerFunc = function(worker) {
		worker.port.on("selectedListChange", this.mediator.sidebarSelectionChangedNotify.bind(this.mediator));
		this.sidebarWorker = worker;
	}
	
	this.mainButtonClick = function() {
		this.mediator.mainButtonClickNotify();
		this.uiView.sidebarShow();
	}
	
	this.initView = function() {
		if (typeof (this.mediator) == 'undefined') 
			throw new Error("Mediator undefined in UIController.")
		this.uiView.createSidebar(this.sidebarWorkerFunc.bind(this));
		this.uiView.createButton(this.mainButtonClick.bind(this));
	}
	
	this.initMediator = function(mediator) {
		this.mediator = mediator;
	}
	
	this.sendTabList = function(message) {
		this.sidebarWorker.port.emit("youtubeListChange", message);
	}
	
}

module.exports = UIController;