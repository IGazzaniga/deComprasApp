angular.module('deComprasApp.remote-list')
	.controller('MisListasRemotesCtrl', ['$scope', '$state', '$stateParams', 'AuthService', 'UserService', 'ListService', '$ionicModal', '$ionicPopup', 
		function($scope, $state, $stateParams, AuthService, UserService, ListService, $ionicModal, $ionicPopup){
	  	
	  	var userId = $stateParams.userId;

	  	$scope.misListas = UserService.getListsByUserId(userId);
	  			  	
	  	UserService.getUserById(userId).then(function(user){
	  		$scope.userData = user;
	  	});

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
	            UserService.asignarLista(data.key, userId);
	            ListService.getById(data.key).then(function(list){
	            	$scope.misListas.push(list);
	            });
	        });
			$scope.modal.remove();
		};

		$scope.removeList = function(List) {
			ListService.getMembers(List.$id).then(function(members){
				UserService.sacarLista(members, List.$id);
				ListService.remove(List).then(function(data){
					$scope.misListas = UserService.getListsByUserId(userId);
				});
			});
		};

			  	// Confirm para borrar lista
		 $scope.showConfirmDeleteList = function(List) {
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'Borrar lista',
		     template: 'Seguro desea borrar esta lista?',
		     okText: 'SI',
		     cancelText: 'NO'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       $scope.removeList(List);
		     } else {
		       console.log('You are not sure');
		     }
		   });
		 };
}])