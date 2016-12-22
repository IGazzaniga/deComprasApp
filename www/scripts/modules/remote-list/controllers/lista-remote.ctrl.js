angular.module('deComprasApp.remote-list')
	.controller('ListaRemoteCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicPopup', '$ionicModal', '$state', '$stateParams', 'UserService', 'ListService', '$firebaseArray', 
		function($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $state, $stateParams, UserService, ListService){
	 

	  	ListService.getById($stateParams.listaRemoteId).then(function(data){
	  		$scope.listaActual = data;
	  		ListService.getMembers($stateParams.listaRemoteId).then(function(data){
	  			$scope.listaActual.users = [];
	  			angular.forEach(data, function(value, key){
	  				UserService.getUserById(key).then(function(user){
	  					$scope.listaActual.users.push(user);
	  				})
	  			})
	  		});
	  		ListService.getItems($stateParams.listaRemoteId).then(function(data){
	  			$scope.listaActual.items = data;
	  		});
	  	});	

	  	UserService.getAll().then(function(data){
	  		$scope.allUsers = data;
	  	})
	  		
	  	$scope.userSearch = {};

	  	$scope.toggleLeft = function() {
		  $ionicSideMenuDelegate.toggleLeft();
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