angular.module('deComprasApp.login')
	.config(['$stateProvider', function($stateProvider) {

	  $stateProvider 

	  .state('main.login', {
	    url: '/login',
	    cache: false,
	    views: {
	      'listascomp-tab': {
	        templateUrl: 'scripts/modules/login/views/login.html',
	        controller: 'LoginCtrl'
	      }
	    }  
	  })
}]);
