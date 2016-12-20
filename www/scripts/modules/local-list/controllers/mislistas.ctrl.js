angular.module('deComprasApp.local-list')
	.controller('MisListasCtrl', ['$scope', '$ionicModal', '$ionicPopup', 'Listas', function($scope, $ionicModal, $ionicPopup, Listas) {

		$scope.loadList = function() {
			Listas.getAllList().then(function(results){
			  	$scope.misListas = [];
			    for(var i=0; i < results.rows.length; i++){
			      $scope.misListas.push(results.rows.item(i));
			    }
			});		
		};

		$scope.loadList();


		$scope.createModalList = function() {
		  $ionicModal.fromTemplateUrl('scripts/modules/local-list/views/modals/modalAddList.html', {
	        scope: $scope
	      }).then(function(modal) {
	        $scope.modal = modal;
	        $scope.modal.show();
	      });
		};

		 $scope.nuevaLista= {
		  	'listaId': 0,
		  	'nombre': '',
		  	'detalle':'',
		  	'fecha':'',
		  	'hora':'',
		  	'hecho': 0,
		  	'total': 0
		  };

		  $scope.addList = function(lista) {
		    Listas.saveList(lista).then(function(result){
		    	var idLast = result.insertId - 1;
		    	$scope.modal.remove();
			    $scope.nuevaLista= {
				  	'listaId': 0,
				  	'nombre': '',
				  	'detalle':'',
				  	'fecha':'',
				  	'hora':'',
				  	'hecho': false,
				  	'total': 0
			  	};
			  	$scope.loadList();
		    });
		  }

		  	// Confirm para borrar lista
		 $scope.showConfirmDeleteList = function(idList) {
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'Borrar lista',
		     template: 'Seguro desea borrar esta lista?',
		     okText: 'SI',
		     cancelText: 'NO'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       $scope.deleteList(idList);
		     } else {
		       console.log('You are not sure');
		     }
		   });
		 };

		$scope.deleteList = function(idList) {
			Listas.deleteList(idList).then(function(data){
				$scope.loadList();
			});
		}

	}])