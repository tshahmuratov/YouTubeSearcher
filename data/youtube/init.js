"use strict";

var view = new YouTubeView();
var model = new YouTubeModel(view);
var controller = new YouTubeController(model);

console.log("start init");
view.init();
console.log("init2");
controller.init();
console.log("init3");
self.port.on("sidebarSelectionChanged", controller.selectedChanged.bind(controller));
console.log("end init");