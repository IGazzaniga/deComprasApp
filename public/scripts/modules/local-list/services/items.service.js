angular.module('deComprasApp.local-list')

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