angular.module('deComprasApp.remote-list')
	.config(['$stateProvider', function($stateProvider) {

	  $stateProvider 

	.state('main.mis-listas-remotes', {
	    url: '/listas-remotes',
	    cache: false,
	    views: {
	      'listascomp-tab': {
	        templateUrl: 'scripts/modules/remote-list/views/mis-listas-remotes.html',
	        controller: 'MisListasRemotesCtrl'
	      }
	    }  
	})

	.state('main.lista-remote', {
	    url: '/lista-remote/:listaRemoteId',
	    cache: false,
	    views: {
	      'listascomp-tab': {
	        templateUrl: 'scripts/modules/remote-list/views/lista-remote.html',
	        controller: 'ListaRemoteCtrl'
	      }
	    }  
  	})
}]);