"use strict";

!function(window, angular, undefined) {
    function searchResultsServiceFactory() {
		var data = {};
		var filteredArray = [];
		
		function updateRates(queries) {
			var lcname;
			var count;
			filteredArray = [];
			for(var i in data) {
				lcname = data[i].name.toLowerCase();
				count = 0;
				for (var j in queries) {
					if (lcname.indexOf(queries[j])!=-1) {
						count++;
					}
				}
				if (count>0) filteredArray.push({id: i, rate: count});
			}
			console.log("updateRates")
			console.log(JSON.stringify(filteredArray))
		}
		
		function sortComparator(a,b) {
			if(a.rate < b.rate) return 1;
			if(a.rate > b.rate) return -1;
			return 0;
		}
		
        function getSearchResults(queryString) {
            var queries = queryString.toLowerCase().split(' ');
			var results = [];
			updateRates(queries);
			filteredArray.sort(sortComparator);
			for (var i in filteredArray) {
				if (filteredArray[i]) {
					results.push({id: filteredArray[i].id, name: data[filteredArray[i].id].name, url: data[filteredArray[i].id].url});
				}
			}
			console.log("getSearchResults")
			console.log(JSON.stringify(results))
			return results;
        }
		
		function parseMessageToResults(message) {
			console.log("parseMessageToResults1\n"+message)
			var inData = JSON.parse(message);
			console.log("parseMessageToResults2")
			for (var i in inData) {
				data[inData[i].id] = {href: inData[i].href, name: inData[i].name};
			}
			console.log("parseMessageToResults3")
			console.log(JSON.stringify(inData))
			
		}
		
        return {
            search: getSearchResults,
			parseMessage: parseMessageToResults
        }
    }
    angular.module("services").factory("searchResultsService", searchResultsServiceFactory)
}(window, window.angular)