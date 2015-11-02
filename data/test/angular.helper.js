var injector = angular.injector(['ng', 'sidebar']);
var searchService = injector.get('searchResultsService');

var init = {
	setup: function() {
		this.$scope = injector.get('$rootScope').$new();
		var $controller = injector.get('$controller');
		$controller('AppController', {
			$scope: this.$scope,
			searchResultsService: searchService
		});
	}
};