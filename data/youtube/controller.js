var YouTubeController = function(model) {
	this.model = model;
	this.self = self;
	
	this.selectedChanged = function(list) {
		this.model.unselectAllVideos();
		list = window.JSON.parse(list);
		for (var id in list) {
			this.model.selectVideo(id);
		}
	}
	
	this.getLoaded = function() {
		var result = this.model.getSelectedVideos();
		console.log(window.JSON.stringify(result));
		return window.JSON.stringify(result);
	}
	
	this.parseNodes = function(nodeList) {
		var res = {}
		for (var i in nodeList) {
			if (!nodeList[i].href) continue;
			if (nodeList[i].href.indexOf("/watch")!=-1) {
				var url = nodeList[i].href
				var name = nodeList[i].parentElement.parentElement.getElementsByTagName('H3')[0].firstChild.innerHTML
				var parentElement = nodeList[i].parentElement.parentElement;
				this.model.addVideo(url, name, parentElement)
			}
		}
	}
	
	this.onSpecMutation = function(mutation) {
		var nodes = mutation.addedNodes;
		for (var i in nodes) {
			if (nodes[i].nodeType === 1) {
				this.parseNodes(nodes[i]);
			}
		}
		this.sendNewList();
	}
	
	this.onMutations = function(mutations) {
		mutations.forEach(this.onSpecMutation.bind(this));
	}
	
	this.sendNewList = function() {
		this.self.port.emit("youtubeListChanged", this.getLoaded()); 
	}
	
	this.initialParse = function() {
		var nodeList = document.getElementsByClassName('spf-link');
		this.parseNodes(nodeList);
		this.sendNewList();
	}
	
	this.init = function() {
		var target = document.getElementsByClassName('section-list')[0];
		console.log(target);
		// create an observer instance
		var observer = new MutationObserver(this.onMutations.bind(this));
		
		// configuration of the observer:
		var config = { attributes: true, childList: true, characterData: true };
		
		// pass in the target node, as well as the observer options
		observer.observe(target, config);
		this.initialParse();
	}
}