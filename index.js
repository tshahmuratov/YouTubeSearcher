let self = require('sdk/self');
let buttons = require('sdk/ui/button/action');
let tabs = require("sdk/tabs");

var UIControllerModule = require("./js/controller.ui.js");
var uiController = new UIControllerModule("https://www.youtube.com/");

var UIViewModule = require("./js/view.ui.js");
var uiView = new UIViewModule(uiController);