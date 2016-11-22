angular.module('starter.controllers', [])

.controller('MainCtrl', ['$scope', '$webSql', function($scope, $webSql){

	$scope.db = $webSql.openDatabase('deComprasDB', '1.0', '', 2 * 1024 * 1024);

    $scope.db.createTable('lista', {
      "idLista":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "nombre":{
        "type": "TEXT",
        "null": "NOT NULL",
      },
      "detalle": {
      	"type":"TEXT"
      },
      "fecha":{
        "type": "TIMESTAMP",
        "null": "NOT NULL"
      },
      "hora": {
        "type": "TIMESTAMP",
        "null": "NOT NULL"
      },
      "hecho": {
        "type": "BOOLEAN",
        "default": false
      },
      "total": {
        "type":"REAL",
        "default":0
      }
    });

    $scope.db.createTable('item', {
      "idItem":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "nombre":{
        "type": "TEXT",
        "null": "NOT NULL",
      },
      "precio": {
        "type":"REAL"
      },
      "idLista": {
        "type": "INTEGER"
      }
    });
}])

.controller('MisListasCtrl', ['$scope', '$ionicModal', '$ionicPopup', 'Listas', function($scope, $ionicModal, $ionicPopup, Listas) {

	$scope.loadList = function() {
		Listas.getAllList().then(function(results){
		  	$scope.misListas = [];
		    for(var i=0; i < results.rows.length; i++){
		      $scope.misListas.push(results.rows.item(i));
		    }
		});		
	};

	$scope.loadList();

  	$scope.createModalList = function() {
	  $ionicModal.fromTemplateUrl('templates/modalAddList.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();
	  });
	};

	 $scope.nuevaLista= {
	  	'listaId': 0,
	  	'nombre': '',
	  	'detalle':'',
	  	'fecha':'',
	  	'hora':'',
	  	'hecho': false,
	  	'total': 0
	  };

	  $scope.addList = function(lista) {
	    Listas.saveList(lista).then(function(result){
	    	var idLast = result.insertId - 1;
	    	$scope.modal.remove();
		    $scope.nuevaLista= {
			  	'listaId': 0,
			  	'nombre': '',
			  	'detalle':'',
			  	'fecha':'',
			  	'hora':'',
			  	'hecho': false,
			  	'total': 0
		  	};
		  	$scope.loadList();
	    });
	  }

	  	// Confirm para borrar item
	 $scope.showConfirmDeleteList = function(idList) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar lista',
	     template: 'Seguro desea borrar esta lista?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       $scope.deleteList(idList);
	     } else {
	       console.log('You are not sure');
	     }
	   });
	 };

	$scope.deleteList = function(idList) {
		Listas.deleteList(idList).then(function(data){
			$scope.loadList();
		});
	}

}])

.controller('ListaCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', 'Items', function($scope, $stateParams, $ionicModal, $ionicPopup, Items, Listas ) {

	//llamada al servicio para que traiga los items de la lista seleccionada

	$scope.loadItems = function() {
		Items.getItems($stateParams.listaId).then(function(results){
		  	$scope.items = [];
		    for(var i=0; i < results.rows.length; i++){
		      $scope.items.push(results.rows.item(i));
		    }
		});		
	};

	$scope.loadItems();

	$scope.createModalItem = function() {
	  $ionicModal.fromTemplateUrl('templates/modalAddItem.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();
	  });
	};

	 $scope.addItem = function(item) {
	 	$scope.saveItem($stateParams,item);
	 	$scope.modal.remove();
	 };

	$scope.saveItem = function($stateParams, item) {
		Items.saveItem($stateParams.listaId, item).then(function(data){
			$scope.loadItems();
		});
	};

	// Confirm para borrar item
	 $scope.showConfirmDelete = function(idItem) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar item',
	     template: 'Seguro desea borrar este item?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       Items.deleteItem(idItem).then(function(data){
	       	$scope.loadItems();
	       });
	     } else {
	       console.log('You are not sure');
	     }
	   });
	 };

}])
