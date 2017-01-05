angular.module('deComprasApp.login')
	.controller('LoginCtrl', ['$scope', '$state', 'UserService', 'AuthService', 
		function($scope, $state, UserService, AuthService){

	    if (AuthService.isLoggedIn()) {
	    	$state.go("main.mis-listas-remotes");
	    };
	    
	  	// login with Facebook
	  	$scope.login = function() {
	  		AuthService.loginFacebook().then(function(firebaseUser) {
	  			UserService.saveUser(firebaseUser.user);
	  			$state.go("main.mis-listas-remotes",{},{reload: true});
		  	}).catch(function(error) {
		    	console.log("Authentication failed:", error);
		  	});
	  	};
}])