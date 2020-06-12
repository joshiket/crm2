var app = angular.module('crmApp', [ "ui.router","ngMessages" ]); 
  
// define route configurations inside app.config 
// injecting dependencies 
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);
app.config(function($stateProvider, $locationProvider,  
                                $urlRouterProvider) { 
  
    // creating routes or states 
    $stateProvider 
        .state('Dashboard', { 
            url : '/', 
            templateUrl  : "dashboard/dashboard.html",             
        }) 
        .state('Customers', { 
            url : '/Customers/list', 
            templateUrl : "customers/list.html", 
            controller : "customerListController",
            controllerAs : "clc"
        }) 
        .state('newCustomer', { 
            url : '/Customers/new', 
            template : "customers/new.html", 
            controller : "newCustomerController",
            controllerAs : "ncc"
        }); 
  
    // Redirect to home page if url does not  
    // matches any of the three mentioned above 
    $urlRouterProvider.otherwise("/"); 
}); 