var mainModule = require("../js/main.js");
var Tabs = require("sdk/tabs"); 

var main = new mainModule("https://www.youtube.com/", ["./youtube/controller.js", "./youtube/model.js","./youtube/view.js", "./youtube/init.js", "./test/controller.code.js"], ['./test/controller.code.js']);

exports["test main"] = function(assert, done) {
	assert.pass("Unit test running!");
	Tabs.once('ready', function() {
		assert.pass("Waited for load!");
		done();
	});
	main.uiController.mainButtonClick();
};

exports["test youtube view checkElement"] = function(assert, done) {
	main.tabController.tabWorker.port.once("documentClass", function(className) {
		assert.ok(className.indexOf('youtubeSearcherSelected') != -1, "class youtubeSearcherSelected add to body");
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		view.checkElement(document.body); \
		self.port.emit('documentClass', document.body.className); \
	");
};

exports["test youtube view uncheckElement"] = function(assert, done) {
	main.tabController.tabWorker.port.once("documentClass", function(className) {
		assert.ok(className.indexOf('youtubeSearcherSelected') == -1, "class youtubeSearcherSelected removed from body");
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		view.uncheckElement(document.body); \
		self.port.emit('documentClass', document.body.className); \
	");
};

exports["test youtube model getVideoForExport"] = function(assert, done) {
	main.tabController.tabWorker.port.once("videoList", function(list) {
		var obj = JSON.parse(list);
		assert.ok(obj.id == 0);
		assert.ok(typeof(obj.name) != 'undefined');
		assert.ok(typeof(obj.url) != 'undefined');
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		self.port.emit('videoList', window.JSON.stringify(model.getVideoForExport(0))); \
	");
};

exports["test youtube model getSelectedVideos"] = function(assert, done) {
	main.tabController.tabWorker.port.once("videoList", function(list) {
		assert.equal(list, '[]');
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		self.port.emit('videoList', window.JSON.stringify(model.getSelectedVideos())); \
	");
};

exports["test youtube model videosArray"] = function(assert, done) {
	main.tabController.tabWorker.port.once("videoList", function(list) {
		var obj = JSON.parse(list);
		assert.notEqual(typeof(obj[0]), 'undefined', "First video should exist");
		assert.notEqual(typeof(obj[1]), 'undefined', "Second video should exist");
		assert.notEqual(typeof(obj[2]), 'undefined', "Third video should exist");
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		self.port.emit('videoList', window.JSON.stringify(model.videosArray)); \
	");
};

exports["test youtube model selectVideos"] = function(assert, done) {
	main.tabController.tabWorker.port.once("videoList", function(list) {
		var obj = JSON.parse(list);
		assert.equal(obj.length, 3, "Length should be 3 but equal to " + obj.length);
		for (var i in obj) {
			assert.equal(obj[i].id, i, "Id should be "+obj[i].id+" but equal to " + i);
		}
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		controller.selectedChanged('[0,1,2]'); \
		self.port.emit('videoList', window.JSON.stringify(model.getSelectedVideos())); \
	");
};

exports["test youtube model selectVideos"] = function(assert, done) {
	main.tabController.tabWorker.port.once("videoList", function(list) {
		var obj = JSON.parse(list);
		assert.equal(obj.length, 3, "Length should be 3 but equal to " + obj.length);
		for (var i in obj) {
			assert.equal(obj[i].id, i, "Id should be "+obj[i].id+" but equal to " + i);
		}
		done();
	});
	main.tabController.tabWorker.port.emit("execCode", "\
		controller.selectedChanged('[0,1,2]'); \
		self.port.emit('videoList', window.JSON.stringify(model.getSelectedVideos())); \
	");
};

require("sdk/test").run(exports);
