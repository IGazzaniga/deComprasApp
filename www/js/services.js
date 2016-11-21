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

  var id = 0;

  return {

    getItems: function(listaId) {

    },

    saveItem: function(listaId, item) {

    },

    delete: function(listaId,idItem) {

    }
  };
}])
