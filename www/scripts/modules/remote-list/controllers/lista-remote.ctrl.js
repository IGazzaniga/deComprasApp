angular.module('deComprasApp.remote-list')
	.controller('ListaRemoteCtrl', ['$scope', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$ionicModal', 
		function($scope, $state, $stateParams, $firebaseAuth, $firebaseObject, $firebaseArray, $ionicModal){
	  
	  	var ref = firebase.database().ref();
	  	var auth = $firebaseAuth();
	  	var listaRef = ref.child('Listas/' + $stateParams.listaRemoteId);
	  	$scope.listaActual = $firebaseObject(listaRef);
	  	$scope.listaActual.items = $firebaseArray(listaRef.child('items'));

	  	

	}])