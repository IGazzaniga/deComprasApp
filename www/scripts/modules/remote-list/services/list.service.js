(function() {
  'use strict';

  angular
    .module('deComprasApp.remote-list')
    .factory('ListService', ['$firebaseArray', '$firebaseObject', 'DataBaseService', 'UserService', 
      function($firebaseArray, $firebaseObject, DataBaseService, UserService){

        function add(list) {
          return $firebaseArray(DataBaseService.listas).$add(list);
        }

        function getAll () {
          return $firebaseArray(DataBaseService.listas).$loaded();
        }

        function getById(listId) {
          return $firebaseObject(DataBaseService.listas.child(listId)).$loaded();
        }

        function getMembers(listId) {
          return $firebaseObject(DataBaseService.listas.child(listId).child('members')).$loaded();
        }

        function addMember(membersIds) {
          return membersIds.$save();
        }

        function remove(list) {
          return $firebaseObject(DataBaseService.listas.child(list.$id)).$remove();
        }

        function sacarMember(listId, userId) {
          var member = $firebaseObject(DataBaseService.listas.child(listId).child('members').child(userId));
          return member.$remove();
        }    

        function addItem(listId, item) {
          return $firebaseArray(DataBaseService.listas.child(listId).child('items')).$add(item);
        }

        function getItems(listId) {
          return $firebaseArray(DataBaseService.listas.child(listId).child('items')).$loaded();
        }

        function vaciar(listId) {
          return $firebaseObject(DataBaseService.listas.child(listId).child('items')).$remove();
        }

        function deleteItem(itemId, listId) {
          return $firebaseObject(DataBaseService.listas.child(listId).child('items').child(itemId)).$remove();
        }

        function tacharItem(itemId, listId, precio) {
          $firebaseObject(DataBaseService.listas.child(listId).child('items').child(itemId)).$loaded().then(function(item){
            item.precio = precio;
            item.checked = true;
            return item.$save();
          });
        }

        function destacharItem(itemId, listId) {
          $firebaseObject(DataBaseService.listas.child(listId).child('items').child(itemId)).$loaded().then(function(item){
            item.precio = 0;
            item.checked = false;
            return item.$save();
          });
        }
        
        var service = {
          add: add,
          getAll: getAll,
          getById: getById,
          getMembers: getMembers,
          remove: remove,
          addMember: addMember,
          sacarMember: sacarMember,
          getItems: getItems,
          addItem: addItem,
          vaciar: vaciar,
          deleteItem: deleteItem,
          tacharItem: tacharItem,
          destacharItem, destacharItem
        };

        return service;

      }]);

})();