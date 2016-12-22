(function() {
  'use strict';

  angular
    .module('deComprasApp.remote-list')
    .factory('UserService', ['$firebaseArray', '$firebaseObject', 'AuthService', 'DataBaseService', 
      function($firebaseArray, $firebaseObject, AuthService, DataBaseService){

      function getUserById(uid) {
        return $firebaseObject(DataBaseService.users.child(uid)).$loaded();
      }

      function getAll() {
        return $firebaseArray(DataBaseService.users).$loaded();
      }

      function getListsByUserId(uid) {
        var lists = [];
        var objListas = $firebaseObject(DataBaseService.users.child(uid).child('misListas'));
        objListas.$loaded().then(function(data){
          var myLists = data;
          angular.forEach(myLists, function(value, key){
            lists.push($firebaseObject(DataBaseService.listas.child(key)));
          });
        });
        return lists;
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

      function sacarLista(uid, listId) {
        var misListas = $firebaseObject(DataBaseService.users.child(uid).child('misListas'));
        misListas.listId.$remove();
      }    

      var service = {
        getUserById: getUserById,
        getAll: getAll,
        getListsByUserId, getListsByUserId,
        saveUser: saveUser,
        asignarLista: asignarLista,
        sacarLista: sacarLista

      };

      return service;

    }]);

})();