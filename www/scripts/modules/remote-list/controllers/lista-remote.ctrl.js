angular.module('deComprasApp.remote-list')
	.controller('ListaRemoteCtrl', ['$scope', 'ionicToast', 'AuthService', '$ionicSideMenuDelegate', '$ionicPopup', '$ionicModal', '$state', '$stateParams', 'UserService', 'ListService', 
		function($scope, ionicToast, AuthService, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $state, $stateParams, UserService, ListService){
	 
		$scope.myUserId = AuthService.isLoggedIn().uid;

		function getUsersList() {
			ListService.getMembers($stateParams.listaRemoteId).then(function(data){
	  			$scope.listaActual.users = [];
	  			angular.forEach(data, function(value, key){
	  				UserService.getUserById(key).then(function(user){
	  					$scope.listaActual.users.push(user);
	  				})
	  			})
	  		});
		};

	  	ListService.getById($stateParams.listaRemoteId).then(function(data){
	  		$scope.listaActual = data;
	  		getUsersList();
	  		ListService.getItems($stateParams.listaRemoteId).then(function(data){
	  			$scope.listaActual.items = data;
	  		});
	  	});	

	  	UserService.getAll().then(function(data){
	  		$scope.allUsers = data;
	  	})
	  		
	  	$scope.userSearch = {};

	  	$scope.tacharDestachar = function(idItem, check) {
			if (check) {
				$scope.ingresarPrecio(idItem);		
			} else {
				ListService.destacharItem(idItem, $stateParams.listaRemoteId);
			}
			ListService.getItems($stateParams.listaRemoteId).then(function(data){
	  			$scope.listaActual.items = data;
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
				ListService.tacharItem(idItem, $stateParams.listaRemoteId, precio);
				$scope.modal.remove();
				ListService.getItems($stateParams.listaRemoteId).then(function(data){
		  			$scope.listaActual.items = data;
		  		});	
			};
		};

	  	$scope.toggleLeft = function() {
		  $ionicSideMenuDelegate.toggleLeft();
		};

		$scope.salirLista = function(listId) {
			var confirmPopup = $ionicPopup.confirm({
		     title: 'Salir',
		     template: 'Seguro desea salir de esta lista?',
		     okText: 'SI',
		     cancelText: 'NO'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       ListService.sacarMember(listId, $scope.myUserId).then(function(data){
		       	UserService.sacarListaByUserId($scope.myUserId, listId).then(function(data){
		       		$state.go('main.mis-listas-remotes', {userId: $scope.myUserId});
		       	});
		       });
		     } else {
		       console.log('You are not sure');
		     }
		   });
		}

		$scope.vaciar = function(listId) {
			var confirmPopup = $ionicPopup.confirm({
		     title: 'Vaciar Lista',
		     template: 'Seguro desea eliminar todos los elementos de esta lista?',
		     okText: 'SI',
		     cancelText: 'NO'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       ListService.vaciar(listId).then(function(data){
		       	$scope.listaActual.items = [];
		       	ionicToast.show('La lista se vacio correctamente', 'middle', false, 3000);
		       })
		     } else {
		       console.log('You are not sure');
		     }
		   });
		};

		$scope.showTotal = function(listaId) {
			var total = 0;
			ListService.getItems($stateParams.listaRemoteId).then(function(data){
	  			angular.forEach(data, function(item) {
	  				total = total + item.precio;
	  			});
  				$ionicPopup.alert({
			       title: 'Total',
			       template: 'El total de la lista hasta el momento es: $' + total
			    });
	  		});
		}

		$scope.deleteItem = function(itemId, listId) {
			var confirmPopup = $ionicPopup.confirm({
		     title: 'Borrar item',
		     template: 'Seguro desea borrar este item?',
		     okText: 'SI',
		     cancelText: 'NO'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
				ListService.deleteItem(itemId, listId).then(function(x){
					ListService.getItems($stateParams.listaRemoteId).then(function(data){
			  			$scope.listaActual.items = data;
			  			ionicToast.show('Item eliminado correctamente', 'middle', false, 3000);
			  		});
				});
		     } else {
		       console.log('You are not sure');
		     }
		   });
		};

		$scope.createModalMembers = function() {
		  $ionicModal.fromTemplateUrl('scripts/modules/remote-list/views/modals/modalAddMember.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		};

		$scope.createModalItem = function() {
			$ionicModal.fromTemplateUrl('scripts/modules/remote-list/views/modals/modalAddItem.html', {
			    scope: $scope
			}).then(function(modal) {
			    $scope.modal = modal;
			    $scope.modal.show();
			});
		};

		$scope.addItem = function(item) {
			item.precio = 0;
			item.checked = false;
			ListService.addItem($stateParams.listaRemoteId, item).then(function(data){
				$scope.modal.remove();
				ListService.getItems($stateParams.listaRemoteId).then(function(data){
		  			$scope.listaActual.items = data;
		  		});
			});
		};

		$scope.addMember = function() {
			if (!angular.equals($scope.userSearch, {}) && $scope.userSearch.name !== '') {
				var existe = false;
				angular.forEach($scope.listaActual.users, function(user){
					if (user.$id === $scope.userSearch.name.$id) {
						existe = true;
						$ionicPopup.alert({
					       title: 'Atención!',
					       template: 'El usuario seleccionado ya se encuentra como miembro en esta lista'
					    });
					} else {
						if ($scope.userSearch.name.$id === undefined) {
							existe = true;
							$ionicPopup.alert({
						       title: 'Atención!',
						       template: 'El usuario seleccionado no existe en DeCompras'
						    });
						}
					}
				})
				if (!existe) {
					ListService.getMembers($stateParams.listaRemoteId).then(function(membersIds){
						membersIds[$scope.userSearch.name.$id] = true;
						ListService.addMember(membersIds).then(function(member){
							UserService.asignarLista($stateParams.listaRemoteId, $scope.userSearch.name.$id);
							getUsersList();
							ionicToast.show('Se agrego correctamente el usuario a esta lista', 'middle', false, 3000);
							$scope.modal.remove();
						});
					})
				}
			} else {
				$ionicPopup.alert({
			       title: 'Atención!',
			       template: 'Seleccione un usuario para agregar'
			     });
			}	
		};

	}])