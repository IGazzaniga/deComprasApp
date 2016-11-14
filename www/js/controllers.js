angular.module('starter.controllers', [])

.controller('MisListasCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.listasSize=Listas.getSize();

  $scope.misListas = [];

  $scope.misListas.push(Listas.getAll());

}])

.controller('AgregarCtrl', ['$scope', 'Listas', function($scope, Listas) {

  $scope.nuevaLista= {};

  $scope.saveList = function(lista) {
    Listas.saveList(lista);
  }

}]);
