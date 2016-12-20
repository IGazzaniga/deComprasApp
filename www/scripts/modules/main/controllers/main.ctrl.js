'use strict';

(function() {

  angular.module('deComprasApp.main')
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

    }]);     
}());
