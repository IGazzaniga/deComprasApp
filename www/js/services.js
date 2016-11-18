angular.module('starter.services', [])

.factory('Listas', ['store', function(store) {

  return {
    getSizeList: function() {
      return localStorage.length;
    },

    getAllList: function() {
      var listas = [];
      for (var i = 1; i < localStorage.length+1; i++) {
        listas.push(store.get(i));
      }
      return listas;
    },

    getOneList: function(listaId) {
      return store.get(listaId);
    },

    saveList: function(lista) {
      var idListActual = localStorage.length;
      var idListNew = idListActual + 1;
      lista.listaId = idListNew;
      store.set(idListNew ,lista);
    }
  };
}])

.factory('Items', ['Listas', 'store', function(Listas, store) {

  return {
    getItems: function(listaId) {
      var items = [];
      for (var i = 0; i < Listas.getOneList(listaId).items.length; i++) {
        items.push(Listas.getOneList(listaId).items[i]);
      }
      return items;
    },

    saveItem: function(listaId, item) {
      var lista = Listas.getOneList(listaId);
      var idItemActual = lista.items.length;
      var idItemNew = idItemActual + 1;
      item.idItem = idItemNew;
      lista.items.push(item);
      store.set(listaId, lista);
    },

    delete: function(listaId,idItem) {
      var lista = Listas.getOneList(listaId);
      var items = lista.items;
      var index = idItem - 1;
      items.splice(index,1);
      lista.items = items;
      store.set(listaId, lista);
    }
  };
}])
