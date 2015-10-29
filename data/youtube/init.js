"use strict";

var view = new YouTubeView();
var model = new YouTubeModel(view);
var controller = new YouTubeController(model);

console.log("start init");
view.init();
console.log("init2");
controller.init();
console.log("end init");
//window.addEventListener('DOMContentLoaded', onLoad);
//window.alert(1123);
//window.onload = onLoad.bind(window);
//window.addEventListener('load', onLoad);
//window.alert(2);
/*view.init();
controller.init();
window.alert(3);*/
//view.init();
//controller.init();
//self.port.on("sidebarSelectionChanged", controller.selectedChanged.bind(controller));