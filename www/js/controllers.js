angular.module('starter.controllers', [])

.controller('MisListasCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.listasSize=Listas.getSize();

  $scope.misListas = Listas.getAll();

}])

.controller('AgregarCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.nuevaLista= {
  	'titulo': '',
  	'detalle':'',
  	'fecha':'',
  	'hora':'',
  	'hecho': false,
  	'items': [],
  	'total': 0
  };

  $scope.saveList = function(lista) {
    Listas.saveList(lista);
  }

}]);
