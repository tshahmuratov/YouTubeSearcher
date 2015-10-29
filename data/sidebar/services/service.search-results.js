"use strict";

!function(window, angular, undefined) {
    function searchResultsServiceFactory($http, $log) {
        function getSearchResults(queryString, resultsLimit) {
            
        }
        return {
            getSearchResults: getSearchResults
        }
    }
    angular.module("services").factory("searchResultsService", searchResultsServiceFactory), searchResultsServiceFactory.$inject = ["$http", "$log"]
}(window, window.angular)