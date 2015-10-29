"use strict";

!function(window, angular, undefined) {
    function searchSuggestionsServiceFactory($http, $log) {
        function getSuggestedSearchQueries(queryString) {
        }
        return {
            getSuggestedSearchQueries: getSuggestedSearchQueries
        }
    }
    angular.module("services").factory("searchSuggestionsService", searchSuggestionsServiceFactory), searchSuggestionsServiceFactory.$inject = ["$http", "$log"]
}(window, window.angular);