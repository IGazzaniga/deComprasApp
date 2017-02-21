angular.module('deComprasApp.local-list')
	.controller('ListaCtrl', ['$scope', 'ionicToast', '$stateParams', '$ionicModal', '$ionicPopup', '$ionicGesture', 'Items', 'Listas', 
		function($scope, ionicToast, $stateParams, $ionicModal, $ionicPopup, $ionicGesture, Items, Listas) {

	//llamada al servicio para que traiga los items de la lista seleccionada

	$scope.loadItems = function() {
		Items.getItems($stateParams.listaId).then(function(results){
		  	$scope.items = [];
		  	var total = 0;
		    for(var i=0; i < results.rows.length; i++){
		    	var itemFinal = results.rows.item(i);
		    	total = total + itemFinal.precio;
		    	if(itemFinal.checked === 0) {
		    		itemFinal.checked = false;
		    	} else {
		    		itemFinal.checked = true;
		    	}
		      	$scope.items.push(itemFinal);
		    }
		    Listas.fijarTotal($stateParams.listaId, total);
		});		
	};

	$scope.loadItems();

	$scope.close = function() {
		$scope.modal.remove();
		$scope.loadItems();
	}

	$scope.nuevoItem = {
		"nombre":'',
		"precio": 0,
		"checked":0
	};

	$scope.createModalItem = function() {
	  $ionicModal.fromTemplateUrl('scripts/modules/local-list/views/modals/modalAddItem.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();
	  });
	};

	Listas.getOneList($stateParams.listaId).then(function(results){
		$scope.listaActual = results.rows.item(0);
	})

	 $scope.addItem = function(item) {
	 	$scope.saveItem($stateParams,item);
	 	item.nombre='';
	 	$scope.modal.remove();
	 };

	$scope.saveItem = function($stateParams, item) {
		Items.saveItem($stateParams.listaId, item).then(function(data){
			$scope.loadItems();
		});
	};

	$scope.ingresarPrecio = function(idItem) {
		$ionicModal.fromTemplateUrl('scripts/modules/local-list/views/modals/modalTacharItem.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		});

		$scope.tachar = function(precio) {
			Items.tacharItem(idItem, precio).then(function(data){
				$scope.modal.remove();
				$scope.loadItems();
			});
		};
	};

	$scope.tacharDestachar = function(idItem, check) {
		if (check) {
			$scope.ingresarPrecio(idItem);		
		} else {
			Items.destacharItem(idItem).then(function(data) {
				$scope.loadItems();
			})
		}
	};

	// Confirm para borrar item
	$scope.showConfirmDelete = function(idItem) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar item',
	     template: 'Seguro desea borrar este item?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       Items.deleteItem(idItem).then(function(data){
	       	$scope.loadItems();
	       	ionicToast.show('Item eliminado correctamente', 'middle', false, 3000);
	       });
	     } else {
	       console.log('You are not sure');
	     }
	   });
	};

	// Confirm para vaciar lista
	$scope.showConfirmVaciar = function(idList) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Vaciar Lista',
	     template: 'Seguro desea vaciar esta lista?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
			Listas.vaciarLista(idList).then(function(data){
				$scope.loadItems();
				ionicToast.show('La lista se vacio correctamente', 'middle', false, 3000);
			});
	     } else {
	       console.log('You are not sure');
	     }
	   });
	};

	$scope.showTotal = function() {
		Listas.getOneList($stateParams.listaId).then(function(results){
			$scope.listaActual = results.rows.item(0);
			var alertPopup = $ionicPopup.alert({
			    title: 'Total',
			    template: 'El total de esta lista es: $' + $scope.listaActual.total
		    });
		})
	};

}])
