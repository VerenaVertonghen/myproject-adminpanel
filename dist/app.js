    angular.module('starter.controllers', [])

    .controller('MainController', function($scope) {
      
      // set the default bootswatch name
      $scope.css = 'dark';
       
      
      // create the list of layout files
      $scope.css = [
        { name: 'dark', url: 'dark' },
        { name: 'light', url: 'light' },
        { name: 'color', url: 'color' }
      ];

    });
/* This file contains the main application declaration, 
also responsible for loading all other packages. 
---------------------------------------------------------------*/

angular.module("starter", [ 'base64', 'ui.router','LocalStorageModule',
  'starter.controllers', 'starter.services','starter.directives','starter.filters',
  'starter.UserService','starter.StateService','starter.CategoryService','starter.NotificationService',
  'starter.UserCtrl','starter.StateCtrl','starter.CategoryCtrl','starter.NotificationCtrl'])
  .config(["$stateProvider","$urlRouterProvider", "$compileProvider",function ($stateProvider, $urlRouterProvider,$compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
      })

      .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
      })


      .state('profile', {
        url: "/profile",
            templateUrl: "templates/profile.html",
            controller: 'UserCtrl'
      })

      .state('notifications', {
        url: "/notifications",
            templateUrl: "templates/notifications.html",
            controller: 'NotificationsCtrl'
      })

      .state('create', {
        url: "/create",
            templateUrl: "templates/create.html",
            controller: 'CreateCtrl'
      })

      .state('app.notification', {
        url: "/notifications/:notificationId",
            templateUrl: "templates/notification.html",
            controller: 'NotificationCtrl'
      })

      .state('app.notification1', {
        url: "/notification1",
            templateUrl: "templates/notification1.html",
            controller: 'Notification1Ctrl'
      })

      .state('app.notification2', {
        url: "/notification2",
            templateUrl: "templates/notification2.html",
            controller: 'Notification2Ctrl'
      })

      .state('app.notificationfinal', {
        url: "/notificationfinal",
            templateUrl: "templates/notificationfinal.html",
            controller: 'NotificationFinalCtrl'
      })

      .state('app.states', {
        url: "/states",
            templateUrl: "templates/states.html",
            controller: 'StatesCtrl'
      })

      .state('app.state', {
        url: "/states/:stateId",
            templateUrl: "templates/state.html",
            controller: 'StateCtrl'
      })

      .state('app.state1', {
        url: "/state1",
            templateUrl: "templates/state1.html",
            controller: 'State1Ctrl'
      })

      .state('app.state2', {
        url: "/state2",
            templateUrl: "templates/state2.html",
            controller: 'State2Ctrl'

      })

      .state('app.state3', {
        url: "/state3",
            templateUrl: "templates/state3.html",
            controller: 'State3Ctrl'

      })

      .state('app.statefinal', {
        url: "/statefinal",
        templateUrl: "templates/statefinal.html",
        controller: 'StateFinalCtrl'
      });
      $urlRouterProvider.otherwise('/login');
  }])
  .constant("apiUrl","http://cosycare.eu-gb.mybluemix.net")
  .constant("welcomeNotificationId","55704b79a325fa1f00190e78")

;

/* Custom model/view elements can be created 
and are called directives.
---------------------------------------------------------------*/

(function(angular) {
  "use strict";

  angular.module("starter.directives", [])
    .directive("ngEquals", function() {
      var directive = { };

      directive.restrict = 'A';
      directive.require = 'ngModel';
      directive.scope = {
      original: '=ngEquals'
      };

      directive.link = function(scope, elm, attrs, ngModel) {
      console.log("into directive");
      ngModel.$parsers.unshift(function(value) {
        console.log("into unshift");
        console.log("into value", value);
        console.log("into scope.original", scope.original);
        ngModel.$setValidity('equals', scope.original === value);
        console.log(scope.original === value);
        return value;
      });
      };

      return directive; 
      })
    .directive("ngFiltered", function() {
      var directive = { };

      directive.restrict = 'A';
      directive.require = 'ngModel';
      directive.scope = {
      filter: '&ngFiltered'
      };

      directive.link = function(scope, elm, attrs, ngModel) {
      ngModel.$parsers.unshift(function(value) {
        var result = scope.filter({
          $value: value
        });
        if (typeof result.then === "function") {
          result.then(function(result) {
            ngModel.$setValidity('filtered', result);
          });
        } else {
          ngModel.$setValidity('filtered', result);
        }
        return value;
      });
      };

      return directive;
    })
      
;}(angular));
angular.module("starter.filters", [])
	.filter('upFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'up'){
	        out.push(category);
	      }
	    });
	    return out;
	  };
	 
	})
	.filter('downFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'down'){
	        out.push(category);
	      }
	    });
	    return out;
	  };
	 
	})
	;

angular.module('starter.services', []);