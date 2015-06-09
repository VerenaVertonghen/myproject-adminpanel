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
