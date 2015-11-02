"use strict";

var view = new YouTubeView();
var model = new YouTubeModel(view);
var controller = new YouTubeController(model);

view.init();
controller.init();
self.port.on("sidebarSelectionChanged", controller.selectedChanged.bind(controller));
