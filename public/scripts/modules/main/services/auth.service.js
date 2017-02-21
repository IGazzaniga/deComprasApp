(function() {
  'use strict';

  angular
    .module('deComprasApp.main')
    .factory('AuthService', ['$firebaseAuth', 'DataBaseService', 
      function ($firebaseAuth, DataBaseService) { 

      var firebaseAuthObject = $firebaseAuth();

      var service = {
        firebaseAuthObject: firebaseAuthObject,
        loginFacebook: loginFacebook,
        logout: logout,
        isLoggedIn: isLoggedIn
      };

      return service;

      ////////////

      function loginFacebook() {
        return firebaseAuthObject.$signInWithPopup("facebook");
      }

      function logout() {
        return firebaseAuthObject.$signOut();
      }

      function isLoggedIn() {
        return firebaseAuthObject.$getAuth();
      }

    }]);

})();