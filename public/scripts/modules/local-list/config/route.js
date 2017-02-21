angular.module('deComprasApp.local-list')
	.config(['$stateProvider', function($stateProvider) {
	    $stateProvider
		  .state('main.mis-listas', {
		    url: '/listas',
		    cache: false,
		    views: {
		      'listas-tab': {
		        templateUrl: 'scripts/modules/local-list/views/mis-listas.html',
		        controller: 'MisListasCtrl'
		      }
		    }
		  })

		  .state('main.lista', {
		    url: '/lista/:listaId',
		    cache: false,
		    views: {
		      'listas-tab': {
		        templateUrl: 'scripts/modules/local-list/views/lista.html',
		        controller: 'ListaCtrl'
		      }
		    }  
		  })	    
  	}]);