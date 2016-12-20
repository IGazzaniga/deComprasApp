angular.module('deComprasApp.remote-list')
	.controller('ListaRemoteCtrl', ['$scope', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$ionicModal', 
		function($scope, $state, $stateParams, $firebaseAuth, $firebaseObject, $firebaseArray, $ionicModal){
	  
	  	var ref = firebase.database().ref();
	  	var auth = $firebaseAuth();
	  	var listaRef = ref.child('Listas/' + $stateParams.listaRemoteId);
	  	$scope.listaActual = $firebaseObject(listaRef);
	  	$scope.listaActual.items = $firebaseArray(listaRef.child('items'));
	  	$scope.allUsers = $firebaseArray(ref.child('Users'));
	  	$scope.userSearch = {};

	  	$scope.getUsers = function() {
	  		$scope.usersSearches = [];
		  	angular.forEach($scope.allUsers, function(user){
		  		if (user.name.toUpperCase().includes($scope.userSearch.name.toUpperCase()) && $scope.userSearch.name.trim() !== '' ) {
		  			$scope.usersSearches.push(user);
		  		}
		  	})	  		
		};

		$scope.createModalMembers = function() {
		  $ionicModal.fromTemplateUrl('scripts/modules/remote-list/views/modals/modalAddMember.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		};

	}])