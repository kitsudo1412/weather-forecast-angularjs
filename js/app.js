// MODULE
var app = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
app.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });

    $locationProvider.html5Mode(true);
});

// SERVICES
app.service('cityService', function () {

    this.city = "Hanoi, VN";
    this.weatherApiAppId = "6869d4308628b10f4759cc8747fc9c42";

});

// CONTROLLERS
app.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

    $scope.city = cityService.city;

    console.log($scope);

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function () {
        $location.path('forecast');
    };

    $scope.web_title = "123";

    $scope.dummyArray = [1, 2, "3", function() {

    }];
    $location['tun'] = 123;
    $scope.dummyFunction = function() {


    }
}]);

app.controller('forecastController', ['$scope', '$resource', '$routeParams', '$location', 'cityService', function ($scope, $resource, $routeParams, $location, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.numberOfResultChoices = ['2', '5', '10'];

    $scope.dateFormat = 'MMM d, y';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days,
        appid: cityService.weatherApiAppId
    });

    $scope.convertToCelsius = function (degK) {
        return Math.round(degK - 273);
    };
    console.log("weatherController: $location = ");
    console.log($location);
    $scope.convertToDate = function (dt) {
        return new Date(dt * 1000);
    }

    $scope.changeNumberOfResults = function () {
        $location.path('forecast/' + $scope.days).replace();
    }

}]);

// DIRECTIVES

app.directive('weatherReport', function () {
    return {
        templateUrl: 'directives/weather-report.html',
        replace: false,
        scope: {
            cityDay: '=',
            funcConvertToCelsius: '&',
            funcConvertToDate: '&',
            dateFormat: '@'
        }
    }
});