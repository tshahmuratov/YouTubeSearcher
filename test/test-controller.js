var UIControllerModule = require("../js/controller.ui.js");

exports["test urlController"] = function(assert) {
	var destUrl = "about:blank";
	var uiController = new UIControllerModule(destUrl);
	assert.ok((require("sdk/tabs").activeTab.url === destUrl), "test activeTab url changed");
};

require("sdk/test").run(exports);
