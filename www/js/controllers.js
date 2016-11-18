angular.module('starter.controllers', [])

.controller('MisListasCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.listasSize=Listas.getSizeList();

  $scope.misListas = Listas.getAllList();

}])

.controller('ListaCtrl', ['$scope', '$stateParams', '$ionicModal', 'Items', function($scope, $stateParams, $ionicModal, Items, Listas ) {

	//llamada al servicio para que traiga los items de la lista seleccionada
	$scope.items = Items.getItems($stateParams.listaId);

	  $ionicModal.fromTemplateUrl('templates/modalAddItem.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	 $scope.addItem = function(item) {
	 	$scope.saveItem($stateParams,item);
	 	$scope.modal.hide();
	 	$scope.items.push(item);
	 }

	$scope.saveItem = function($stateParams, item) {
		Items.saveItem($stateParams.listaId, item);
	}

}])

.controller('AgregarCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.nuevaLista= {
  	'listaId': 0,
  	'titulo': '',
  	'detalle':'',
  	'fecha':'',
  	'hora':'',
  	'hecho': false,
  	'items': [],
  	'total': 0
  };

  $scope.saveList = function(lista) {
    Listas.saveList(lista);
  }

}]);
