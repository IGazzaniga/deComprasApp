angular.module('deComprasApp.remote-list')
	.controller('ListaRemoteCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicPopup', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$ionicModal', 
		function($scope, $ionicSideMenuDelegate, $ionicPopup, $state, $stateParams, $firebaseAuth, $firebaseObject, $firebaseArray, $ionicModal){
	  
	  	var ref = firebase.database().ref();
	  	var auth = $firebaseAuth();
	  	var listaRef = ref.child('Listas/' + $stateParams.listaRemoteId);
	  	$scope.listaActual = $firebaseObject(listaRef)	
	  	$scope.listaActual.$loaded().then(function(){
	  		$scope.listaActual.users = [];
	  	});
  		var membersRef = listaRef.child('members');
		$firebaseArray(membersRef).$loaded().then(function(x){
			$scope.members = x;
			angular.forEach($scope.members, function(user){
				$firebaseObject(ref.child('Users/' + user.$value)).$loaded().then(function(x){
					$scope.listaActual.users.push(x);
				})
			});
		});
	  	$firebaseArray(listaRef.child('items')).$loaded().then(function(x){
	  		$scope.listaActual.items = x;
	  	});
	  	$firebaseArray(ref.child('Users')).$loaded().then(function(x){
	  		$scope.allUsers = x;
	  	});
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

		$scope.addMember = function() {
			if (!angular.equals($scope.userSearch, {}) && $scope.userSearch.name !== '') {
				var existe = false;
				angular.forEach($scope.members, function(userId){
					if (userId.$value === $scope.userSearch.name.$id) {
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
					$scope.members.$add($scope.userSearch.name.$id).then(function(data){
						$firebaseObject(ref.child('Users/' + $scope.userSearch.name.$id)).$loaded().then(function(x){
							$scope.listaActual.users.push(x);
						})
						var ListsRef = ref.child('Users/' + $scope.userSearch.name.$id + '/misListas');
						$firebaseArray(ListsRef).$loaded().then(function(x){
							$scope.misListas = x;
							$scope.misListas.$add($scope.listaActual.$id);
							$scope.modal.remove();
						});
					});	
				}
			} else {
				$ionicPopup.alert({
			       title: 'Atención!',
			       template: 'Seleccione un usuario para agregar'
			     });
			}	
		};

	}])