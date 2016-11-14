angular.module('starter.services', [])

.factory('Listas', ['store', function(store) {

  return {
    getSize: function() {
      return localStorage.length;
    },
    getAll: function() {
      for (var i = 0; i < localStorage.length; i++) {
        return store.get(i);
      }
    },
    saveList: function(lista) {
      var idListActual = localStorage.length;
      var idListNew = idListActual++;
      store.set(idListNew ,lista);
    }
  };
}]);
