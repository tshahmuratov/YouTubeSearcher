"use strict";

!function(window, angular, undefined) {
    function AppControllerFactory($scope, $window, searchResultsService, searchSuggestionsService) {
		function loadList() {
			if (!$scope.query.length) return;
			$scope.filteredResults = searchResultsService.search($scope.query);
			var selectedIds = [];
			for (var i in $scope.filteredResults) {
				selectedIds.push($scope.filteredResults[i].id);
			}
			var eventDetail = {detail: JSON.stringify(selectedIds)};
			var event = new CustomEvent('sidebarSelectedEvent', eventDetail);
			window.dispatchEvent(event);
		}
	
		function youtubeListReceived(message) {
			searchResultsService.parseMessage(message.detail);
			if ($scope.showResults) {
				loadList();
			}
			$scope.$apply();
		}
		
		$scope.startSearch = function() {
			$scope.showResults = true;
			$scope.query = $scope.queryInputValue;
			loadList();
			var searchExamples = localStorage.getItem('searchYouTube')
			if (!searchExamples) searchExamples = '[]';
			searchExamples = JSON.parse(searchExamples);
			if (searchExamples.indexOf($scope.queryInputValue) == -1) {
				if (searchExamples.length > 100) {
					searchExamples.shift();
				}
				searchExamples.push($scope.queryInputValue);
				localStorage.setItem('searchYouTube',JSON.stringify(searchExamples));
				$('#searchYouTube').autocomplete("option", {source: searchExamples, minLength:1, delay:0});
			}
		}
	
		window.addEventListener('youtubeListEvent', youtubeListReceived, false);
        
		$scope.loading = false;
		$scope.showResults = false;
		$scope.queryInputValue = "";
		$scope.query = "";
		$scope.filteredResults = [];
	}
    angular.module("sidebar").controller("AppController", AppControllerFactory), AppControllerFactory.$inject = ["$scope", "$window", "searchResultsService", "searchSuggestionsService"]
}(window, window.angular);