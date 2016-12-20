angular.module('deComprasApp.login')
	.config(['$stateProvider', function($stateProvider) {

	  $stateProvider 

	  .state('main.login', {
	    url: '/login',
	    cache: false,
	    views: {
	      'content': {
	        templateUrl: 'scripts/modules/login/views/login.html',
	        controller: 'LoginCtrl'
	      }
	    }  
	  })
}]);
