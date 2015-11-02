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
		}
		
		function sortComparator(a,b) {
			if(a.rate < b.rate) return 1;
			if(a.rate > b.rate) return -1;
			return 0;
		}
		
        function getSearchResults(queryString) {
            var queries = queryString.trim().toLowerCase().split(' ');
			var results = [];
			updateRates(queries);
			filteredArray.sort(sortComparator);
			for (var i in filteredArray) {
				if (filteredArray[i]) {
					results.push({id: filteredArray[i].id, name: data[filteredArray[i].id].name, url: data[filteredArray[i].id].url});
				}
			}
			return results;
        }
		
		function parseMessageToResults(message) {
			var inData = JSON.parse(message);
			for (var i in inData) {
				data[inData[i].id] = {url: inData[i].url, name: inData[i].name};
			}
		}
		
        return {
            search: getSearchResults,
			parseMessage: parseMessageToResults
        }
    }
    angular.module("services").factory("searchResultsService", searchResultsServiceFactory)
}(window, window.angular)