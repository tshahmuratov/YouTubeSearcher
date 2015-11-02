addon.port.on("youtubeListChange",  processMessage);

function processMessage(message) {
	var eventDetail = {detail: message};
	var event = new CustomEvent('youtubeListEvent', eventDetail);
	window.dispatchEvent(event);
}

window.addEventListener('sidebarSelectedEvent', function (e) { sendMessage(e.detail); }, false);

function sendMessage(message) {
	addon.port.emit("selectedListChange", message);
}