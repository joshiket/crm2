app.controller("customerListController",function(dataService){
    var clc = this;
    clc.customers = {};
    clc.customers.data = []
    clc.getCustomers=function()
    {
        console.log("fetching customer list...");
        var response = dataService.httpCall(clc.customers,"http://localhost/crm-api/index.php/api/Customer/","GET");
        response.then(function(result){            
            console.log(angular.toJson(result.data));

                clc.customers.data = result.data;                
                console.log(clc.customers.data);
  
     
       },
       function(result){
               alert(angular.toJson(result));
       });  
    };

    clc.init = function()
    {
        console.clear();
        console.log("Initialising customer list controller...")
        clc.getCustomers();

    };
    clc.init();
});