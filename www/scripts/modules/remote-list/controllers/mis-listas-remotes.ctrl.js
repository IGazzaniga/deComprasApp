angular.module('deComprasApp.remote-list')
	.controller('MisListasRemotesCtrl', ['$scope', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$ionicModal', '$ionicPopup', function($scope, $state, $stateParams, $firebaseAuth, $firebaseObject, $firebaseArray, $ionicModal, $ionicPopup){
	  
	  	var ref = firebase.database().ref();
	  	var auth = $firebaseAuth();
	  	var myUserData = ref.child('Users/' + $stateParams.userId);
	  	var myListIdsRef = ref.child('Users/' + $stateParams.userId + '/misListas');
	  	var myListIds = $firebaseArray(myListIdsRef);
	  	var listasRef = ref.child('Listas');
	  	var listas = $firebaseArray(listasRef);
	  	$scope.userData = $firebaseObject(myUserData);

		$scope.misListas = [];
		myListIds.$loaded().then(function(x){
			for (var i = 0; i < x.length; i++) {
		  		var listaRef = listasRef.child(x[i].$value);
		  		$scope.misListas.push($firebaseObject(listaRef)); 
			}		
		});

		$scope.logout = function() {
	  		auth.$signOut().then(function(){
	  			$state.go("main.login");
	  		})
	  	};

		$scope.createModalListComp = function() {
		  $ionicModal.fromTemplateUrl('scripts/modules/remote-list/views/modals/modalAddListRemote.html', {
	        scope: $scope
	      }).then(function(modal) {
	        $scope.modal = modal;
	        $scope.modal.show();
	      });
		};

		$scope.addListComp = function(nuevaListaComp) {
			nuevaListaComp.userIdCreator = $stateParams.userId;
			nuevaListaComp.members = [$stateParams.userId];
			nuevaListaComp.items = [];
			listas.$add(nuevaListaComp).then(function(ref){
				if ($scope.userData.misListas === undefined) {
					$scope.userData.misListas = [];
				}
				$scope.userData.misListas.push(ref.key);
				$scope.userData.$save();

				$scope.misListas.push($firebaseObject(listasRef.child(ref.key)));
			});
			$scope.modal.remove();
		};

		$scope.removeList = function(idList) {
			var listaRemove = listas.$getRecord(idList);
			listas.$remove(listaRemove);
			var index = $scope.userData.misListas.indexOf(idList);
			$scope.userData.misListas.splice(index, 1);
			$scope.misListas.splice(index, 1);
			$scope.userData.$save();
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
		       $scope.removeList(idList);
		     } else {
		       console.log('You are not sure');
		     }
		   });
		 };
}])