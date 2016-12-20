angular.module('deComprasApp.main')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	    $stateProvider
		  .state('main', {
		    url: '/main',
		    abstract: true,
		    templateUrl: 'scripts/modules/main/views/main.tpl.html',
		    controller: 'MainCtrl'
		  })

		$urlRouterProvider.otherwise('/main/listas');	    
  	}]);