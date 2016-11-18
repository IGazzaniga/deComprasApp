angular.module('starter.controllers', [])

.controller('MisListasCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.listasSize=Listas.getSizeList();

  $scope.misListas = Listas.getAllList();

}])

.controller('ListaCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'Items', function($scope, $stateParams, $ionicModal, $ionicPopup, Items, Listas ) {

	//llamada al servicio para que traiga los items de la lista seleccionada
	$scope.items = Items.getItems($stateParams.listaId);

	$scope.createModal = function() {
	  $ionicModal.fromTemplateUrl('templates/modalAddItem.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();
	  });
	};

	 $scope.addItem = function(item) {
	 	$scope.saveItem($stateParams,item);
	 	$scope.modal.remove();
	 	$scope.items.push(item);
	 };

	$scope.saveItem = function($stateParams, item) {
		Items.saveItem($stateParams.listaId, item);
	};

	// A confirm dialog
	 $scope.showConfirmDelete = function(idItem) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar item',
	     template: 'Seguro desea borrar este item?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       $scope.deleteItem(idItem);
	     } else {
	       console.log('You are not sure');
	     }
	   });
	 };

	$scope.deleteItem = function(idItem) {
		Items.delete($stateParams.listaId,idItem);
		$scope.items = Items.getItems($stateParams.listaId);
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
