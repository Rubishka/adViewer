/**
 * Created by rubi on 26/03/2017.
 */

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view

angular.module('Controllers', ['Services', 'Directives'])
    .controller('ADsController', ['$scope', 'adService', function ($scope, adService) {
        $scope.ads = [];

        //I like to have an init() for controllers that need to perform some initialization. Keeps things in
        //one place...not required though especially in the simple example below
        init();
        function init() {
           // var adsName=$scope.search.adsName;
            var adsName="";
            var templateLink="";
            console.log(templateLink);
            adService.getallADs(adsName, templateLink)
                .then(function (data) {
                    $scope.ads = angular.copy(data);
                    console.log(data);
                });
        }
        $scope.init2 = function() {
            var adsName=$scope.search.adsName;
            var templateLink=$scope.search.templateLink;
            console.log(adsName, templateLink);
            adService.getallADs(adsName, templateLink)
                .then(function (data) {
                    $scope.ads = angular.copy(data);
                    console.log(data);
                });
        }

        $scope.insertAD = function () {

            var templateLink = $scope.newAD.templateLink;
            var adsName = $scope.newAD.adsName;
            var AddLine = $scope.newAD.AddLine;
            var day = $scope.newAD.day;
            var fromHour = $scope.newAD.fromHour;
            var toHour = $scope.newAD.toHour;
            var fromDate = $scope.newAD.fromDate;
            var toDate = $scope.newAD.toDate;
            var screen = $scope.newAD.screen;
            console.log(adsName);
            adService.insertNewAD(templateLink,adsName,AddLine, day, fromHour,toHour,fromDate,toDate,screen);

            $scope.newAD.templateLink='';
            $scope.newAD.adsName='';
            $scope.newAD.AddLine='';
            $scope.newAD.day='';
            $scope.newAD.fromHour='';
            $scope.newAD.toHour='';
            $scope.newAD.fromDate='';
            $scope.newAD.toDate='';
            $scope.newAD.screen='';
        };

        $scope.deleteAD = function (id) {
            console.log('id='+id);
            adService.delete(id);
        };



    }])

    .controller('NavbarController', ['$scope', '$location', function ($scope, $location) {
        $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) == path) {
                return true
            } else {
                return false;
            }
        }  }])

            .controller('statsController', ['$scope', 'adService', function ($scope, adService) {
                console.log("controller!");
                $scope.adStats = [];
                initStats();
                function initStats() {
                    adService.getStats()
                        .then(function (data) {
                            $scope.adStats = angular.copy(data);
                            console.log(data);
                        });
                }
            }]);