function YouTubeView() {
	this.checkElement = function(elem) {
		elem.classList.add('youtubeSearcherSelected');
	}
	
	this.uncheckElement = function(elem) {
		elem.classList.remove('youtubeSearcherSelected');
	}
	
	//create css class
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.youtubeSearcherSelected { border-color: red; }';
	document.getElementsByTagName('head')[0].appendChild(style);
}

function YouTubeModel(inView) {
	if (!(inView instanceof YouTubeView))
		throw "inView of wrong type " + inView.constructor;
	var view = inView;
	var autoIncrementId = 0;
	var videosArray = {};
	var selectedVideos = {}
	
	this.addVideo = function(url, name, parentElement) {
		var id = autoIncrementId++;
		videosArray[id] = {url: url, name: name, parentElement: parentElement};
	}
	
	this.selectVideo = function(id) {
		selectedVideos[id] = 1;
		view.checkElement(videosArray[id].parentElement);
	}
	
	this.unselectVideo = function(id) {
		delete selectedVideos[id];
		view.uncheckElement(videosArray[id].parentElement);
	}
	
	this.unselectAllVideos = function() {
		for (var id in selectedVideos) {
			this.unselectVideo(id);
		}
	}
	
	this.getSelectedVideos = function() {
		var result = []
		for (var id in selectedVideos) {
			var desc = videosArray[id];
			result.push({id: id, url: desc.url, name: desc.name, parentElement: desc.parentElement});
		}
		return result;
	}
}

function YouTubeController(inModel) {
	if (!(inModel instanceof YouTubeModel))
		throw "inModel of wrong type " + inModel.constructor;
	
	var model = inModel;
	function selectedChanged(list) {
		model.unselectAllVideos();
		list = JSON.parse(list);
		for (var id in list) {
			model.selectVideo(id);
		}
	}
	
	function getLoaded() {
		var result = model.getSelectedVideos();
		return JSON.stringify(result);
	}
	
	function parseNodes(nodeList) {
		var res = {}
		for (var i in arr) {
			if (!arr[i].href) continue;
			if (arr[i].href.indexOf("/watch")!=-1) {
				var url = arr[i].href
				var name = arr[i].parentElement.parentElement.getElementsByTagName('H3')[0].firstChild.innerHTML
				var parentElement = arr[i].parentElement.parentElement;
				model.addVideo(url, name, parentElement)
			}
		}
	}
	
	function onMutation(mutation) {
		var nodes = mutation.addedNodes;
		for (var i in nodes) {
			if (nodes[i].nodeType === 1) {
				parseNodes(nodes[i]);
			}
		}
		sendNewList();
	}
	
	function sendNewList() {
		self.port.emit("youtubeListChanged", getLoaded()); 
	}
	
	function initialParse() {
		var nodeList = document.getElementsByClassName('spf-link');
		parseNodes(nodeList);
		sendNewList();
	}
	
	function init() {
		var target = document.getElementsByClassName('section-list')[0];
		
		// create an observer instance
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(onMutation);    
		});
		
		// configuration of the observer:
		var config = { attributes: true, childList: true, characterData: true };
		
		// pass in the target node, as well as the observer options
		console.log(target);
		observer.observe(target, config);
		initialParse();
	}
	
	window.addEventListener('DOMContentLoaded', init.bind(this));
	
	self.port.on("addonSelectedChanged", selectedChanged);
}

controller = new YouTubeController(new YouTubeModel(new YouTubeView()));
