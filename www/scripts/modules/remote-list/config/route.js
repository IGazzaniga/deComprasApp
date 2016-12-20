angular.module('deComprasApp.remote-list')
	.config(['$stateProvider', function($stateProvider) {

	  $stateProvider 

	.state('main.mis-listas-remotes', {
	    url: '/listas-comp/:userId',
	    cache: false,
	    views: {
	      'content': {
	        templateUrl: 'scripts/modules/remote-list/views/mis-listas-remotes.html',
	        controller: 'MisListasRemotesCtrl'
	      }
	    }  
	})

	.state('main.lista-remote', {
	    url: '/lista-comp/:listaRemoteId',
	    cache: false,
	    views: {
	      'content': {
	        templateUrl: 'scripts/modules/remote-list/views/lista-remote.html',
	        controller: 'ListaRemoteCtrl'
	      }
	    }  
  	})
}]);