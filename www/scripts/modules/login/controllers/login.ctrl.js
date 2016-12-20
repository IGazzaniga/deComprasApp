angular.module('deComprasApp.login')
	.controller('LoginCtrl', ['$scope', '$state', '$firebaseAuth', function($scope, $state, $firebaseAuth){
  
	  	var auth = $firebaseAuth();
	  	var ref = firebase.database().ref();
	  	var UsersRef = ref.child('Users');

	    if (auth.$getAuth()) {
	    	$state.go("main.mis-listas-remotes",{userId: auth.$getAuth().uid});
	    };
	    
	  	// login with Facebook
	  	$scope.login = function() {
	  		auth.$signInWithPopup("facebook").then(function(firebaseUser) {
	  			var myUser = ref.child('Users/' + firebaseUser.user.uid);
	  			myUser.on('value', function(snapshot) {
				    if(snapshot.val() === null){
			  			var userRef = ref.child('Users/' + firebaseUser.user.uid);
			  			userRef.set({
							"name": firebaseUser.user.displayName,
			  				"email": firebaseUser.user.email,
			  				"photo": firebaseUser.user.photoURL,
			  				"misListas": []
			  			});
		  			}
				});
	  			$state.go("main.mis-listas-remotes", {userId: firebaseUser.user.uid});
		  	}).catch(function(error) {
		    	console.log("Authentication failed:", error);
		  	});
	  	};
}])