var UIViewModule = require("./js/view.ui.js");
var UIControllerModule = require("./js/controller.ui.js");
var TabControllerModule = require("./js/controller.tab.js");
var TabUIMediatorModule = require("./js/tab.ui.mediator.js");

var uiView = new UIViewModule();
var uiController = new UIControllerModule(uiView);
var tabController = new TabControllerModule("https://www.youtube.com/");
var mediator = new TabUIMediatorModule(uiController, tabController);

tabController.initTabListener();
uiController.initView();