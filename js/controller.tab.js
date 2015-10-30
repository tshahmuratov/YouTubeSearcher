var Tabs = require("sdk/tabs"); 

var TabController = function(url) {
	this.url = url;
	this.mediator;
	this.tabWorker;
	this.youtubeOpened = false;
	
	this.prepareActiveTab = function() {
		if (typeof (this.mediator) == 'undefined') 
			throw new Error("Mediator undefined in TabController.")
		var tab = Tabs.activeTab;
		
		tab.url = this.url;
	}
	
	this.attachScripts = function(tab) {
		this.tabWorker = tab.attach({
			contentScriptFile: ["./youtube/controller.js", "./youtube/model.js","./youtube/view.js", "./youtube/init.js"],
			contentScriptWhen: "end"
		});
		this.tabWorker.port.on("youtubeListChanged", this.onYouTubeListMessage.bind(this));
	}
	
	this.onYouTubeListMessage = function(message) {
		this.mediator.youTubeListChangedNotify(message);
	}
	
	this.initMediator = function(mediator) {
		this.mediator = mediator;
	}
	
	this.sendSidebarSelection = function(message) {
		console.log("sendSidebarSelection");
		this.tabWorker.port.emit("sidebarSelectionChanged", message);
	}
	
	this.initTabListener = function(message) {
		Tabs.on("ready", this.checkTab.bind(this));
	}
	
	this.checkTab = function(tab) {
		if (tab === Tabs.activeTab && tab.url == this.url && !this.youtubeOpened) {
			tab.on("ready", this.attachScripts.bind(this));
			tab.on("close", this.detachController.bind(this));
			this.youtubeOpened = true;
		}
	}
	
	this.detachController = function(tab) {
		this.youtubeOpened = false;
	}
}

module.exports = TabController;