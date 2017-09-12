/**
 * Created by rubi on 26/03/2017.
 */

var app = angular.module('ADsApp', ['ngRoute', 'Directives', 'Services', 'Controllers']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/ADs',
            {
                controller: 'ADsController',
                templateUrl: 'app/partials/ADs.html'
            })
        .when('/stats',
            {
                controller: 'statsController',
                templateUrl: 'app/partials/stats.html'
            })
        .when('/createAD',
            {
                controller: 'ADsController',
                templateUrl: 'app/partials/createAD.html'
            })
        .when('/about',
            {
                templateUrl: 'app/partials/about.html'
            })
        .otherwise({ redirectTo: '/ADs' });
});

