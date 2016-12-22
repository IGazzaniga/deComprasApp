(function() {
  'use strict';

  angular
    .module('deComprasApp.remote-list')
    .factory('DataBaseService', function(){

      var root = firebase.database().ref();

      var service = {
        root: root,
        users: root.child('users'),
        listas: root.child('listas'),
        items: root.child('items')
      };

      return service;
      
    });

})();