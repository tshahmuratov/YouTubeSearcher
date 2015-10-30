addon.port.on("youtubeListChange",  processMessage);

function processMessage(message) {
	var eventDetail = {detail: message};
	var event = new CustomEvent('youtubeListEvent', eventDetail);
	window.dispatchEvent(event);
	console.log("recieved in sidebar");
}

window.addEventListener('sidebarSelectedEvent', function (e) { console.log(e.detail); sendMessage(e.detail); }, false);

function sendMessage(message) {
	console.log("send in sidebar "+message);
	addon.port.emit("selectedListChange", message);
}