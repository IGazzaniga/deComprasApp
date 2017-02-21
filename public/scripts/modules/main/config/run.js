angular.module('deComprasApp.main')

.config(['$ionicConfigProvider', 'FacebookProvider', function($ionicConfigProvider, FacebookProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.maxCache(0);
      // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCApY3KncwgAc-9eHhwdw1_XoBfubdCVWM",
      authDomain: "de-compras-b2bfc.firebaseapp.com",
      databaseURL: "https://de-compras-b2bfc.firebaseio.com",
      storageBucket: "de-compras-b2bfc.appspot.com",
      messagingSenderId: "955671816280"
    };
    
    firebase.initializeApp(config);
  FacebookProvider.init('1879522828951395');

}])


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

  });
}])