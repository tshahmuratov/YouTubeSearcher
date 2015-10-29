var Tabs = require("sdk/tabs"); 

var UIController = function(inUrl) {
	var url = inUrl;
	var worker;
	var youTubeListChangedNotify = function(message) {
		
	}
	
	this.handleTabButtonClick = function() {
		var tab = Tabs.activeTab;
		tab.url = inUrl;
		worker = tab.attach({
			contentScriptFile: "./youtube/controller.js",
		});
		worker.port.on("youtubeListChanged", youTubeListChangedNotify);
	}
	
	this.addonSelectionChangeNotify = function(message) {
		worker.port.emit("addonSelectedChanged", message);
	}
}

module.exports = UIController;