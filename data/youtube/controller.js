var YouTubeController = function(model) {
	this.model = model;
	this.self = self;
	
	this.selectedChanged = function(list) {
		this.model.unselectAllVideos();
		list = window.JSON.parse(list);
		for (var id in list) {
			this.model.selectVideo(list[id]);
		}
	}
	
	this.parseNodes = function(nodeList) {
		var res = [];
		if (!nodeList) return res;
		for (var i in nodeList) {
			if (!nodeList[i]) continue;
			if (!nodeList[i].href) continue;
			if (nodeList[i].href.indexOf("/watch")!=-1) {
				var url = nodeList[i].href
				var name = nodeList[i].parentElement.parentElement.getElementsByTagName('H3')[0].firstChild.innerHTML
				var parentElement = nodeList[i].parentElement.parentElement;
				var obj = this.model.addVideo(url, name, parentElement);
				if (obj) res.push(obj);
			}
		}
		return res;
	}
	
	this.onSpecMutation = function(mutation) {
		var nodes = mutation.addedNodes;
		var res = [];
		var nodeList, tmpRes;
		for (var i in nodes) {
			if (typeof(nodes[i].nodeType) == 'undefined') continue;
			if (nodes[i].nodeType === 1) {
				nodeList = nodes[i].getElementsByClassName('spf-link');
				tmpRes = this.parseNodes(nodeList);
				res = res.concat(tmpRes);
			}
		}
		this.sendNewList(res);
	}
	
	this.onMutations = function(mutations) {
		mutations.forEach(this.onSpecMutation.bind(this));
	}
	
	this.sendNewList = function(list) {
		list = window.JSON.stringify(list);
		this.self.port.emit("youtubeListChanged", list); 
	}
	
	this.initialParse = function() {
		var nodeList = document.getElementsByClassName('spf-link');
		this.sendNewList(this.parseNodes(nodeList));
	}
	
	this.init = function() {
		var target = document.getElementsByClassName('section-list')[0];
		// create an observer instance
		var observer = new MutationObserver(this.onMutations.bind(this));
		
		// configuration of the observer:
		var config = { attributes: true, childList: true, characterData: true };
		
		// pass in the target node, as well as the observer options
		observer.observe(target, config);
		this.initialParse();
	}
}