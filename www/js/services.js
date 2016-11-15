angular.module('starter.services', [])

.factory('Listas', ['store', function(store) {

  return {
    getSize: function() {
      return localStorage.length;
    },
    getAll: function() {
      var listas = [];
      for (var i = 1; i < localStorage.length+1; i++) {
        listas.push(store.get(i));
      }
      return listas;
    },
    saveList: function(lista) {
      var idListActual = localStorage.length;
      var idListNew = idListActual + 1;
      store.set(idListNew ,lista);
    }
  };
}]);
