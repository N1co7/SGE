// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $location, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  
      $location.path("/login");
  
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('home-usuario', {
      url: '/home-usuario',
      templateUrl: 'templates/home-usuario.html'
    })

    .state('listar-grifos', {
      url: '/listar-grifos',
      templateUrl: 'templates/listar-grifos.html'
    })
    
     .state('listar-emergencias', {
      url: '/listar-emergencias',
      templateUrl: 'templates/listar-emergencias.html'
    })
     .state('listar-info', {
      url: '/listar-info',
      templateUrl: 'templates/listar-info.html'
    })
    ;
    $urlRouterProvider.otherwise('/login');

});




  