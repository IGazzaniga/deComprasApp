angular.module('deComprasApp.remote-list')
	.controller('MisListasRemotesCtrl', ['$scope', 'Facebook', '$ionicLoading', 'ionicToast', '$state', 'AuthService', 'UserService', 'ListService', '$ionicModal', '$ionicPopup', 
		function($scope, Facebook, $ionicLoading, ionicToast, $state, AuthService, UserService, ListService, $ionicModal, $ionicPopup){
	  	
	  	if (AuthService.isLoggedIn()) {
	 		var userId = AuthService.isLoggedIn().uid;
	 	} else {
	 		$state.go('main.login');
	 		return;
	 	}

	    $scope.me = function() {
	      Facebook.api('/me', function(response) {
	        $scope.me = response;
	      });
	    };

		$ionicLoading.show();
	  	$scope.misListas = [];
	  	UserService.getListsByUserId(userId).then(function(data){
          var myLists = data;
          angular.forEach(myLists, function(value, key){
            $scope.misListas.push(ListService.getById(key));
          });
          $ionicLoading.hide();
        });
	  			  	
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
	            ListService.getById(data.key).$loaded().then(function(list){
	            	$scope.misListas.push(list);
	            });
	        });
			$scope.modal.remove();
		};

		$scope.removeList = function(List) {
			ListService.getMembers(List.$id).then(function(members){
				UserService.sacarLista(members, List.$id);
				ListService.remove(List).then(function(data){
					$scope.misListas = [];
				  	UserService.getListsByUserId(userId).then(function(data){
			          var myLists = data;
			          angular.forEach(myLists, function(value, key){
			            $scope.misListas.push(ListService.getById(key));
			          });
			        });
					ionicToast.show('Lista eliminada correctamente', 'middle', false, 3000);
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