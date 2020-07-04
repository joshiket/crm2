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
            templateUrl : "customers/new.html", 
            controller : "newCustomerController",
            controllerAs : "ncc"
        }) 
        .state('editCustomer',{
            url : '/Customers/edit/:custId', 
            templateUrl : "customers/edit.html", 
            controller : "updateCustomerController",
            controllerAs : "ucc"
        })
        .state('deleteCustomer',{
            url : '/Customers/delete/:custId', 
            templateUrl : "customers/delete.html", 
            controller : "deleteCustomerController",
            controllerAs : "dcc"
        })
        .state('ProductNameChanges',{
            url : '/ProductNameChanges/list', 
            templateUrl : "prodNameChanges/list.html", 
            controller : "pncListController",
            controllerAs : "pnclc"            
        })
        .state('newProductNameChange', { 
            url : '/ProductNameChanges/new', 
            templateUrl : "prodNameChanges/new.html", 
            controller : "newPncController",
            controllerAs : "npncc"
        })      
        .state('editProductNameChange', { 
            url : '/ProductNameChanges/edit/:pncId', 
            templateUrl : "prodNameChanges/edit.html", 
            controller : "updatePncController",
            controllerAs : "upncc"
        })          
        .state('deleteProductNameChange', { 
            url : '/ProductNameChanges/delete/:pncId', 
            templateUrl : "prodNameChanges/delete.html", 
            controller : "deletePncController",
            controllerAs : "dpncc"
        })                   
        .state('newProduct', { 
            url : '/Products/new', 
            templateUrl : "products/new.html", 
            controller : "newProductController",
            controllerAs : "npc"
        }) 
        .state('Products', { 
            url : '/Products/list', 
            templateUrl : "products/list.html",  
            controller : "productListController",
            controllerAs : "plc"
        }) 
    // Redirect to home page if url does not  
    // matches any of the three mentioned above 
    $urlRouterProvider.otherwise("/"); 
}); 