"use strict";

!function(window, angular, undefined) {
    function AppControllerFactory($scope, $location, $window, $timeout, searchResultsService, searchSuggestionsService) {
		function hasResults() {
			return $scope.results.length
        }
    	$scope.loading = false;
		$scope.results = [];
		$scope.KEY_CODES = {}, $scope.KEY_CODES.ENTER = 13, $scope.KEY_CODES.ESCAPE = 27, $scope.KEY_CODES.UP_ARROW = 38, $scope.KEY_CODES.DOWN_ARROW = 40,
            function() {
                var api = {
                    
                };
                angular.extend($scope, api)
            }(),
            function() {
				//initSection
            }()
    }
    angular.module("sidebar").controller("AppController", AppControllerFactory), AppControllerFactory.$inject = ["$scope", "$location", "$window", "$timeout", "searchResultsService", "searchSuggestionsService"]
}(window, window.angular);