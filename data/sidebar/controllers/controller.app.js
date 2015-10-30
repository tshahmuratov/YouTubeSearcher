"use strict";

!function(window, angular, undefined) {
    function AppControllerFactory($scope, $window, searchResultsService, searchSuggestionsService) {
		function loadList() {
			if (!$scope.query.length) return;
			$scope.filteredResults = searchResultsService.search($scope.query);
			$scope.$apply();
			var selectedIds = [];
			for (var i in $scope.filteredResults) {
				selectedIds.push($scope.filteredResults[i].id);
			}
			console.log("sendListMessage");
			var eventDetail = {detail: JSON.stringify(selectedIds)};
			var event = new CustomEvent('sidebarSelectedEvent', eventDetail);
			window.dispatchEvent(event);
		}
	
		function youtubeListReceived(message) {
			searchResultsService.parseMessage(message.detail);
			if ($scope.showResults) {
				loadList();
			}
		}
		
		$scope.startSearch = function() {
			console.log("startSearch");
			$scope.showResults = true;
			console.log("showResults");
			$scope.query = $scope.queryInputValue;
			console.log("loadList");
			loadList();
			console.log("ok");
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