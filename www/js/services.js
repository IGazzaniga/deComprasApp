angular.module('starter.services', [])

.factory('Listas', ['$webSql', function($webSql) {

  var db = $webSql.openDatabase('deComprasDB', '1.0', '', 2 * 1024 * 1024);

  return {
    getSizeList: function() {
      
    },

    getAllList: function() {
      return db.selectAll("lista");
    },

    getOneList: function(listaId) {
      
    },

    saveList: function(lista) {
      return db.insert('lista', {"nombre": lista.nombre, "detalle": lista.detalle, "fecha": lista.fecha, "hora": lista.hora, "hecho":lista.hecho, "total":lista.total });
    },
    deleteList: function(idList) {
      return db.del('lista',{idLista: idList});
    },

    deleteAllList: function() {
      db.dropTable('lista');
    }
  };
}])

.factory('Items', ['$webSql', function($webSql) {

  var db = $webSql.openDatabase('deComprasDB', '1.0', '', 2 * 1024 * 1024);

  return {

    getItems: function(listaId) {
      return db.select("item",{ idLista: listaId });
    },

    saveItem: function(listaId, item) {
      return db.insert('item', {"nombre": item.nombre, "precio": 0, "idLista":listaId});
    },

    deleteItem: function(idItem) {
      return db.del('item',{idItem: idItem});
    }
  };
}])
