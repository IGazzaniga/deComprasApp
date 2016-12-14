// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-websql', 'firebase'])

.run(['$ionicPlatform', function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form input

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCApY3KncwgAc-9eHhwdw1_XoBfubdCVWM",
      authDomain: "de-compras-b2bfc.firebaseapp.com",
      databaseURL: "https://de-compras-b2bfc.firebaseio.com",
      storageBucket: "de-compras-b2bfc.appspot.com",
      messagingSenderId: "955671816280"
    };
    
    firebase.initializeApp(config);

  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider 

  // setup an abstract state for the tabs directive
  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/main.tpl.html',
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:

  .state('main.mis-listas', {
    url: '/listas',
    cache: false,
    views: {
      'content': {
        templateUrl: 'templates/mis-listas.html',
        controller: 'MisListasCtrl'
      }
    }
  })

  .state('main.lista', {
    url: '/lista/:listaId',
    views: {
      'content': {
        templateUrl: 'templates/lista.html',
        controller: 'ListaCtrl'
      }
    }  
  })

  .state('main.login', {
    url: '/login',
    views: {
      'content': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }  
  })

  .state('main.listasComp', {
    url: '/listas-comp',
    views: {
      'content': {
        templateUrl: 'templates/listas-comp.html',
        controller: 'MisListasCompCtrl'
      }
    }  
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/listas');

}]);
