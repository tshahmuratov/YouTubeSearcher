'use strict';

(function(window, angular, undefined) {

var app = angular.module('sidebar');
	
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		reloadOnSearch: false
	});
	
	$locationProvider.html5Mode(true);
	
}]);

}(window, window.angular));
