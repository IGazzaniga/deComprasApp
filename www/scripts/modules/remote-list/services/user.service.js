(function() {
  'use strict';

  angular
    .module('deComprasApp.remote-list')
    .factory('UserService', ['$q', '$firebaseArray', '$firebaseObject', 'AuthService', 'DataBaseService', 
      function($q, $firebaseArray, $firebaseObject, AuthService, DataBaseService){

      function getUserById(uid) {
        return $firebaseObject(DataBaseService.users.child(uid)).$loaded();
      }

      function getAll() {
        return $firebaseArray(DataBaseService.users).$loaded();
      }

      function getListsByUserId(uid) {
        return $firebaseObject(DataBaseService.users.child(uid).child('misListas')).$loaded();
      }

      function saveUser(user) {
        var myUser = DataBaseService.users.child(user.uid);
        myUser.on('value', function(snapshot) {
          if(snapshot.val() === null){
            var userRef = DataBaseService.users.child(user.uid);
            userRef.set({
              "name": user.displayName,
              "email": user.email,
              "photo": user.photoURL,
              "misListas": []
            });
          }
        });
      }

      function asignarLista(listId, userId) {
        var misListas = $firebaseObject(DataBaseService.users.child(userId).child('misListas'));
        misListas.$loaded().then(function(data){
          misListas[listId] = true;
          misListas.$save();
        })
      }

      function sacarLista(members, listId) {
        var defered = $q.defer();
        var promise = defered.promise;
        angular.forEach(members, function(value, userId){
          $firebaseObject(DataBaseService.users.child(userId).child('misListas').child(listId)).$remove();
        });  
        return promise; 
      };    

      function sacarListaByUserId(userId, listId) {       
        return $firebaseObject(DataBaseService.users.child(userId).child('misListas').child(listId)).$remove();
      };

      var service = {
        getUserById: getUserById,
        getAll: getAll,
        getListsByUserId, getListsByUserId,
        saveUser: saveUser,
        asignarLista: asignarLista,
        sacarLista: sacarLista,
        sacarListaByUserId: sacarListaByUserId
      };

      return service;

    }]);

})();