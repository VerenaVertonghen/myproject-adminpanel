angular.module('starter.NotificationCtrl').controller('CreateCtrl', ['$scope', '$state', 'NotificationService', 'CategoryService', 'localStorageService',
    function($scope, $state, NotificationService, CategoryService, localStorageService) {
    	console.log('into Notification1Ctrl');
        
        //$scope.allNotifications = [];
        $scope.allCategories = [];

        $scope.notification = {};
        
        $scope.showadmin = false;
        $scope.submitSuccess = false;
        
        var encodedlogin = "";
        var notificationtype = "";
        
        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            var admin = localStorageService.get("ls-admin");
            if(admin){
                $scope.showadmin = true;
            }else{
                $scope.showadmin = false;
            }
            console.log("$scope.showadmin",$scope.showadmin);

            loadCategories();
        }

        function loadCategories() {
            var result = CategoryService.getCategories(encodedlogin);
            result.success(getCategoriesSuccess).error(getCategoriesError);
        }

        function getCategoriesSuccess(success) {
            console.log("success");
            $scope.allCategories = success;
            console.log($scope.allCategories);
            console.log($scope.allCategories[0]._id);
        }

        function getCategoriesError(error) {
            console.log("error");
            $scope.error = error;
        }

        // Do this when createNotification is a success
        function createNotificationSuccess(success){
            $scope.success = success;
            $scope.submitSuccess = true;
            console.log("success createNotification");
            //$state.go('app.notificationfinal');
        }

        // Do this when createUser failed
        function createNotificationError(error){
            $scope.error = error;
        }

        $scope.postNotification = function(isValid){
            if(isValid){
                console.log("$scope.notification.text",$scope.notification.text);
                console.log("$scope.notification.title",$scope.notification.title);
                console.log("$scope.notification.categoryid",$scope.notification.categoryid);
                console.log("$scope.notification.type",$scope.notification.type);

                //$encodedLogin,$title,$text,$type,$categoryid
                var result = NotificationService.postNotification(encodedlogin,$scope.notification.title,$scope.notification.text,$scope.notification.type,$scope.notification.categoryid);
                result.success(createNotificationSuccess).error(createNotificationError);
                
            }
                        
        };

        // function loadNotifications() {
        //     var result = NotificationService.getNotifications(encodedlogin);
        //     result.success(getNotificationsSuccess).error(getNotificationsError);
        // }

        // function getNotificationsSuccess(success) {
        //     $scope.allNotifications = success;
        // }

        // function getNotificationsError(error) {
        //     $scope.error = error;
        // }

        // $scope.nextStep = function(){
        //     console.log("nextStep");
        //     console.log("$scope.notification.type",$scope.notification.type);
        //     if($scope.notification.type){
        //         localStorageService.set("ls-type", $scope.notification.type);
        //         $state.go('app.notification2');
        //     }else{
        //         alert("You have not selected a type.");
        //     }  
        // };
    }
]);