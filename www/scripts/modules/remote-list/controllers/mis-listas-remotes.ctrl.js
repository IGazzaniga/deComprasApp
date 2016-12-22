angular.module('deComprasApp.remote-list')
	.controller('MisListasRemotesCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'UserService', 'ListService', '$ionicModal', '$ionicPopup', 
		function($scope, $state, $stateParams, AuthService, UserService, ListService, $ionicModal, $ionicPopup){
	  	
	  	var userId = $stateParams.userId;

	  	$scope.misListas = UserService.getListsByUserId(userId);
	  			  	
	  	$scope.userData = UserService.getUserById(userId);

		$scope.logout = function() {
	  		AuthService.logout().then(function(){
	  			$state.go("main.login");
	  		});
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
			nuevaListaComp.userIdCreator = userId;
			nuevaListaComp.members = {};
			nuevaListaComp.members[userId] = true;
			nuevaListaComp.items = [];
			ListService.add(nuevaListaComp).then(function(data){
	            UserService.asignarLista(data.key);
	            $scope.misListas.push(ListService.getById(data.key));
	        });
			$scope.modal.remove();
		};

/*		$scope.removeList = function(idList) {
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
		 };*/
}])