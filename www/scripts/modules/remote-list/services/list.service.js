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
          var members = $firebaseObject(DataBaseService.listas.child(listId).child('members'));
          members.userId.$remove();
        }    

        function addItem(listId, item) {
          return $firebaseArray(DataBaseService.listas.child(listId).child('items')).$add(item);
        }

        function getItems(listId) {
          return $firebaseArray(DataBaseService.listas.child(listId).child('items')).$loaded();
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
          addItem: addItem
        };

        return service;

      }]);

})();