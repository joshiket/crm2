app.controller("pncListController",function(dataService,pageService){
    var pnclc = this;
    pnclc.prodNameChanges = {};
    pnclc.prodNameChanges.data = [];
    pnclc.prodNameChanges.data2show = [];
    pnclc.Paging = pageService;

    pnclc.getProducts=function()
    {
        console.log("fetching product list...");

        dataService.doGet("http://localhost/crm-api/index.php/api/prodNameChange/",{})
            .then(
            function(response) {
                //console.log(response);
                var data = angular.fromJson(response.data);
                //alert(data);
                pnclc.prodNameChanges.data = data.data;
                console.log(pnclc.prodNameChanges.data);
                //alert(clc.customers.data);
                pnclc.Paging.init(pnclc.prodNameChanges);
                console.log("fetched " + clc.customers.data.length + " cutomer(s).");
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );

    };

    pnclc.init = function()
    {
        console.clear();
        console.log("Initialising pnc list controller...")
        pnclc.getProducts();

    };
    pnclc.init();
});

app.controller("newPncController", function(dataService, alertService){
    var npncc = this;
    npncc.prodNameChange = {};
    npncc.prodNameChange.data = {};
    npncc.prodNameChange.data.oldName = "" ;
    npncc.prodNameChange.data.newName = "" ;
    npncc.alerts = alertService;

    npncc.createProductNameChange = function(){
        console.log("creating new product name change...");
        dataService.doPost("http://localhost/crm-api/index.php/api/prodNameChange/",npncc.prodNameChange.data)
        .then(
            function(response) {                
                console.log(response);
                var data = angular.fromJson(response.data); 
                //alert(data);
                console.log(data);
                npncc.alerts.init(true,data.error,data.msg);                
                
            },
            function(errResponse){
                //console.error('Error while fetching contacts');
                alert(errResponse);
                console.log(errResponse);
            }
        ); 
    };

    npncc.init= function(){
        console.clear();
        console.log("initilising ...");
    };
    npncc.init();
});

app.controller("updatePncController",function(dataService, alertService, $stateParams){
    var upncc =this;
  
    upncc.prodNameChange2FETCH = {};
    upncc.prodNameChange2UPDATE = {};
    upncc.alerts = alertService;

    upncc.getProductNameChanges = function(){
        upncc.prodNameChange2FETCH.pncId = $stateParams.pncId;
        console.log("fetching product...");        
        
        var url = "http://localhost/crm-api/index.php/api/prodNameChange/" + upncc.prodNameChange2FETCH.pncId;
        dataService.doGet(url,{})
            .then(
            function(response) {
                console.log(response);
            
                var data = angular.fromJson(response.data);
                //alert(data);
                upncc.prodNameChange2FETCH = data.data;
                upncc.prodNameChange2UPDATE = angular.copy(upncc.prodNameChange2FETCH);
                console.log("product fetched");
                //alert(clc.customers.data);

            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );        
    };

    upncc.dataChanged = function(){
        var changed = false;
        if(upncc.prodNameChange2UPDATE.oldName != upncc.prodNameChange2FETCH.oldName)
        {
            changed = true;
        }
        if(upncc.prodNameChange2UPDATE.newName != upncc.prodNameChange2FETCH.newName)
        {
            changed = true;
        }
        return changed;
    };

    upncc.updateProductNameChange = function(){
        console.log("saving product name change ...");
        dataService.doPut("http://localhost/crm-api/index.php/api/prodNameChange/",upncc.prodNameChange2UPDATE)
        .then(
            function(response) {                
                console.log(response);
                var data = angular.fromJson(response.data); 
                //alert(data);
                console.log(data);
                upncc.alerts.init(true,data.error,data.msg);                
                
            },
            function(errResponse){
                //console.error('Error while fetching contacts');
                alert(errResponse);
                console.log(errResponse);
            }
        );          

    };

    upncc.init = function(){
        console.clear();
        console.log("initialising ...");
        upncc.getProductNameChanges();
        upncc.alerts.init(false,false,"");
       
    };
    upncc.init();


});

app.controller("deletePncController",function(dataService, alertService, $stateParams){
    var dpncc = this;
    dpncc.prodNameChange2DELETE = {};
    dpncc.alerts = alertService;
    
    dpncc.getProductNameChanges = function(){
        dpncc.prodNameChange2DELETE.pncId = $stateParams.pncId;
        console.log("fetching product...");        
        
        var url = "http://localhost/crm-api/index.php/api/prodNameChange/" + dpncc.prodNameChange2DELETE.pncId;
        dataService.doGet(url,{})
            .then(
            function(response) {
                console.log(response);
            
                var data = angular.fromJson(response.data);
                //alert(data);
                dpncc.prodNameChange2DELETE = data.data;
                
                console.log("product fetched");
                //alert(clc.customers.data);

            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );        
    };

    dpncc.deleteProductNameChanges = function(){
        var url = "http://localhost/crm-api/index.php/api/prodNameChange/" + dpncc.prodNameChange2DELETE.pncId;
        dataService.doDelete(url,{})
        .then(
            function(response) {
                console.log(response);
            
                var data = angular.fromJson(response.data);
                alert(data);
                dpncc.alerts.init(true,data.error,data.msg);
                
                console.log("product name change record deleted.");
                //alert(clc.customers.data);

            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );          
    };
    
    dpncc.init = function(){
        console.clear();
        console.log("initilising ...");
        dpncc.getProductNameChanges();
        dpncc.alerts.init(false,false,"");
    };
    dpncc.init();
});