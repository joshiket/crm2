app.controller("newProductController",function(dataService,alertService){
    var npc = this;
    npc.Product = {};
    npc.Product.prodName = "";
    npc.Product.prodMRP = 0.0;
    npc.alerts = alertService;

    npc.createProduct = function(){
        //var response = dataService.httpCall(ncc.Customer.data,"http://localhost/crm-api/index.php/api/Customer/","POST");
        dataService.doPost("http://localhost/crm-api/index.php/api/Product/",npc.Product)
        .then(
            function(response) {                
                console.log(response);
                var data = angular.fromJson(response.data); 
                //alert(data);
                console.log(data);
                npc.alerts.init(true,data.error,data.msg);                
                
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
                console.log(errResponse);
            }
        );  
    };

    npc.resetForm = function(){
        npc.Product.prodName = "";
        npc.Product.prodMRP = 0.0;
    };

    npc.init = function()
    {
        console.clear();
        console.log("initialising ...");
        npc.alerts.init(false,false,"");
    };
    npc.init();
});

app.controller("productListController",function(dataService,pageService){
    var plc = this;
    plc.Products = {};
    plc.Products.data = [];
    plc.Products.data2show = [];
    plc.Paging = pageService;

    plc.getProducts = function(){
        dataService.doGet("http://localhost/crm-api/index.php/api/Product/",{})
            .then(
            function(response) {
                //console.log(response);
                var data = angular.fromJson(response.data);
                //alert(data);
                plc.Products.data = data.data;                
                //alert(clc.customers.data);
                plc.Paging.init(plc.Products);
                console.log(plc.Products.data2show);
                console.log("fetched " + plc.Products.data.length + " product(s).");
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );

    };

    plc.init = function(){
        console.clear();
        console.log("initialising...");
        plc.getProducts();            
    };
    plc.init();
})