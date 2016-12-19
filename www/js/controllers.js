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
        "type": "INTEGER",
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
      "checked": {
      	"type":"INTEGER",
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
	  $ionicModal.fromTemplateUrl('templates/modales/modalAddList.html', {
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
	  	'hecho': 0,
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

	  	// Confirm para borrar lista
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

.controller('ListaCtrl', ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', '$ionicGesture', 'Items', 'Listas', function($scope, $stateParams, $ionicModal, $ionicPopup, $ionicGesture, Items, Listas) {

	//llamada al servicio para que traiga los items de la lista seleccionada

	$scope.loadItems = function() {
		Items.getItems($stateParams.listaId).then(function(results){
		  	$scope.items = [];
		  	var total = 0;
		    for(var i=0; i < results.rows.length; i++){
		    	var itemFinal = results.rows.item(i);
		    	total = total + itemFinal.precio;
		    	if(itemFinal.checked === 0) {
		    		itemFinal.checked = false;
		    	} else {
		    		itemFinal.checked = true;
		    	}
		      	$scope.items.push(itemFinal);
		    }
		    Listas.fijarTotal($stateParams.listaId, total);
		});		
	};

	$scope.loadItems();

	$scope.close = function() {
		$scope.modal.remove();
		$scope.loadItems();
	}

	$scope.nuevoItem = {
		"nombre":'',
		"precio": 0,
		"checked":0
	};

	$scope.createModalItem = function() {
	  $ionicModal.fromTemplateUrl('templates/modales/modalAddItem.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    $scope.modal.show();
	  });
	};

	Listas.getOneList($stateParams.listaId).then(function(results){
		$scope.listaActual = results.rows.item(0);
	})

	 $scope.addItem = function(item) {
	 	$scope.saveItem($stateParams,item);
	 	item.nombre='';
	 	$scope.modal.remove();
	 };

	$scope.saveItem = function($stateParams, item) {
		Items.saveItem($stateParams.listaId, item).then(function(data){
			$scope.loadItems();
		});
	};

	$scope.ingresarPrecio = function(idItem) {
		$ionicModal.fromTemplateUrl('templates/modales/modalTacharItem.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		});

		$scope.tachar = function(precio) {
			Items.tacharItem(idItem, precio).then(function(data){
				$scope.modal.remove();
				$scope.loadItems();
			});
		};
	};

	$scope.tacharDestachar = function(idItem, check) {
		if (check) {
			$scope.ingresarPrecio(idItem);		
		} else {
			Items.destacharItem(idItem).then(function(data) {
				$scope.loadItems();
			})
		}
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

	// Confirm para vaciar lista
	$scope.showConfirmVaciar = function(idList) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Vaciar Lista',
	     template: 'Seguro desea vaciar esta lista?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
			Listas.vaciarLista(idList).then(function(data){
				$scope.loadItems();
			});
	     } else {
	       console.log('You are not sure');
	     }
	   });
	};

	$scope.showTotal = function() {
		Listas.getOneList($stateParams.listaId).then(function(results){
			$scope.listaActual = results.rows.item(0);
			var alertPopup = $ionicPopup.alert({
			    title: 'Total',
			    template: 'El total de esta lista es: $' + $scope.listaActual.total
		    });
		})
	};

}])

.controller('LoginCtrl', ['$scope', '$state', '$firebaseAuth', function($scope, $state, $firebaseAuth){
  
  	var auth = $firebaseAuth();
  	var ref = firebase.database().ref();
  	var UsersRef = ref.child('Users');

    if (auth.$getAuth()) {
    	$state.go("main.mis-listasComp",{userId: auth.$getAuth().uid});
    };
    
  	// login with Facebook
  	$scope.login = function() {
  		auth.$signInWithPopup("facebook").then(function(firebaseUser) {
  			var myUser = ref.child('Users/' + firebaseUser.user.uid);
  			myUser.on('value', function(snapshot) {
			    if(snapshot.val() === null){
		  			var userRef = ref.child('Users/' + firebaseUser.user.uid);
		  			userRef.set({
						"name": firebaseUser.user.displayName,
		  				"email": firebaseUser.user.email,
		  				"photo": firebaseUser.user.photoURL,
		  				"misListas": []
		  			});
	  			}
			});
  			$state.go("main.mis-listasComp", {userId: firebaseUser.user.uid});
	  	}).catch(function(error) {
	    	console.log("Authentication failed:", error);
	  	});
  	};

}])

.controller('MisListasCompCtrl', ['$scope', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$firebaseArray', '$ionicModal', '$ionicPopup', function($scope, $state, $stateParams, $firebaseAuth, $firebaseObject, $firebaseArray, $ionicModal, $ionicPopup){
  
  	var ref = firebase.database().ref();
  	var auth = $firebaseAuth();
  	var myUserData = ref.child('Users/' + $stateParams.userId);
  	var myListIdsRef = ref.child('Users/' + $stateParams.userId + '/misListas');
  	var myListIds = $firebaseArray(myListIdsRef);
  	var listasRef = ref.child('Listas');
  	var listas = $firebaseArray(listasRef);
  	$scope.userData = $firebaseObject(myUserData);

	$scope.misListas = [];
	myListIds.$loaded().then(function(x){
		for (var i = 0; i < x.length; i++) {
	  		var listaRef = listasRef.child(x[i].$value);
	  		$scope.misListas.push($firebaseObject(listaRef)); 
		}		
	});

	$scope.logout = function() {
  		auth.$signOut().then(function(){
  			$state.go("main.login");
  		})
  	};

	$scope.createModalListComp = function() {
	  $ionicModal.fromTemplateUrl('templates/modales/modalAddListComp.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
	};

	$scope.addListComp = function(nuevaListaComp) {
		nuevaListaComp.userIdCreator = $stateParams.userId;
		nuevaListaComp.members = [$stateParams.userId];
		nuevaListaComp.items = [];
		listas.$add(nuevaListaComp).then(function(ref){
			if ($scope.userData.misListas === undefined) {
				$scope.userData.misListas = [];
			}
			$scope.userData.misListas.push(ref.key);
			$scope.userData.$save();

			$scope.misListas.push($firebaseObject(listasRef.child(ref.key)));
		});
		$scope.modal.remove();
	};

	$scope.removeList = function(idList) {
		var listaRemove = listas.$getRecord(idList);
		listas.$remove(listaRemove);
		var index = $scope.userData.misListas.indexOf(idList);
		$scope.userData.misListas.splice(index, 1);
		$scope.misListas.splice(index, 1);
		$scope.userData.$save();
	}

		  	// Confirm para borrar lista
	 $scope.showConfirmDeleteList = function(idList) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Borrar lista',
	     template: 'Seguro desea borrar esta lista?',
	     okText: 'SI',
	     cancelText: 'NO'
	   });

	   confirmPopup.then(function(res) {
	     if(res) {
	       $scope.removeList(idList);
	     } else {
	       console.log('You are not sure');
	     }
	   });
	 };


}])

.controller('ListaCompCtrl', ['$scope', '$state', '$stateParams', '$firebaseAuth', '$firebaseObject', '$ionicModal', function($scope, $state, $stateParams, $firebaseAuth, $firebaseObject, $ionicModal){
  
  	var ref = firebase.database().ref();
  	var auth = $firebaseAuth();
  	var listaRef = ref.child('Listas/' + $stateParams.listaCompId);
  	$scope.listaActual = $firebaseObject(listaRef);

}])

