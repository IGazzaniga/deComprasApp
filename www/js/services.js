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
      return db.select("lista",{ idLista: listaId });
    },

    saveList: function(lista) {
      return db.insert('lista', {"nombre": lista.nombre, "detalle": lista.detalle, "fecha": lista.fecha, "hora": lista.hora, "hecho":lista.hecho, "total":lista.total });
    },

    fijarTotal: function(idList, total) {
      return db.update('lista', {"total": total}, {"idLista": idList});
    },

    deleteList: function(idList) {
      return db.del('lista',{idLista: idList});
    },

    deleteAllList: function() {
      db.dropTable('lista');
    },

    vaciarLista: function(idList){
      return db.del('item',{idLista: idList});
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
      return db.insert('item', {"nombre": item.nombre, "precio": item.precio, "checked":item.checked, "idLista":listaId});
    },

    deleteItem: function(idItem) {
      return db.del('item',{idItem: idItem});
    },

    tacharItem: function(idItem, precio) {
      return db.update("item", {"precio": precio, "checked": 1}, {'idItem': idItem});
    },

    destacharItem: function(idItem) {
      return db.update("item", {"precio": 0, "checked": 0}, {'idItem': idItem});
    }

  };

}])

.factory('ListasComp', [function() {

  return {

  };
}])


