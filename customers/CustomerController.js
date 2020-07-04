app.controller("customerListController",function(dataService){
    var clc = this;
    clc.customers = {};
    clc.customers.data = [];
    clc.getCustomers=function()
    {
        console.log("fetching customer list...");

        dataService.doGet("http://localhost/crm-api/index.php/api/Customer/",{})
            .then(
            function(response) {
                //console.log(response);
                var data = angular.fromJson(response.data);
                //alert(data);
                clc.customers.data = data.data;
                //console.log(clc.customers.data);
                //alert(clc.customers.data);
                for(var i =0;i<clc.customers.data.length;i++)
                {
                    var dt = clc.customers.data[i].bdate;
                    var dtArr = dt.split("-");
                    dt = dtArr[2] + "-" + dtArr[1] + "-" + dtArr[0];
                    
                    clc.customers.data[i].bdate = dt;
                }
                console.log("fetched " + clc.customers.data.length + " cutomer(s).");
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                alert(errResponse);
            }
        );

    };

    clc.init = function()
    {
        console.clear();
        console.log("Initialising customer list controller...")
        clc.getCustomers();

    };
    clc.init();
});

app.controller("newCustomerController",function(dataService,alertService){
    var ncc = this;
    ncc.Customer = {};
    ncc.Customer.data = {};
    ncc.Customer.data.lastName = "";
    ncc.Customer.data.firstName = "";
    ncc.Customer.data.cellPhone = "";
    ncc.Customer.data.bdate = "";
    ncc.Customer.data.bdateT = "";
    ncc.Customer.data.disPic = "";
    ncc.lastNames = [];
    ncc.custList = [];
    ncc.firstNames = [];
    ncc.disPics = [];
    ncc.showImageList = false;
    ncc.alerts = alertService;
    

    ncc.getLastNames = function(){
        console.log("fetching customer last names...");
        dataService.doGet("http://localhost/crm-api/index.php/api/Customer/",{})
            .then(
            function(d) {
                console.log(response);
                var data = ngular.fromJson(response.data);
                ncc.custList = data.data;
                for(var i=0;i<ncc.custList.length;i++)
                {
                    ncc.lastNames.push(ncc.custList[i].lastName);                    
                }                
                //console.log("fetched " + clc.customers.data.length + " cutomer(s).");
            },
            function(errResponse){
                console.error('Error while fetching contacts');
            }
        );        
       
    };

    ncc.getFirstNames = function(){
        ncc.firstNames = [];
        console.log("fetching customer first names...");
        for(var i=0;i<ncc.custList.length;i++)
        {            
            if(ncc.custList[i].lastName == ncc.Customer.data.lastName)
            {
                ncc.firstNames.push(ncc.custList[i].firstName);
            }
        }
        console.log("fetched " + ncc.firstNames.length + "  record(s)");
    };

    ncc.getDisplyImages = function(){
        console.log("fetching diplay pics ...");
        dataService.doGet("Customers/displayPic.php",{})
        .then(
            function(response) {                
                console.log(response);
                var data = angular.fromJson(response.data);
                //console.log(data);
                ncc.disPics = angular.fromJson(data.data);    
                //alert(ncc.disPics);
                console.log("fetched " + ncc.disPics.length + " display image record(s)");  
            },
            function(errResponse){
                console.error('Error while fetching contacts');
            }
        );          

    };

    ncc.toggleImageList = function(){ncc.showImageList = ! ncc.showImageList;};

    ncc.selectDisPic = function(i){
        //alert(i);
        ncc.Customer.data.disPic = i;
        ncc.toggleImageList();
    };

    ncc.convertDate = function()
    {
        var dt = ncc.Customer.data.bdateT;
        var d = new Date(dt);
        var m = parseInt(d.getMonth()) + 1;
        var m = (m<10) ? "0" + m : m;
        var day = parseInt(d.getDate());
        day  = (day<10) ? "0" + day : day;
        dt = d.getFullYear() + "-" + m + "-" + day;
        ncc.Customer.data.bdate = dt;
        //alert(dt);
        
        
    }
    
    ncc.createCustomer = function(){
        ncc.convertDate();        
        console.log(ncc.Customer.data);
        console.log("saving customer");
        ncc.alerts = alertService;

        //var response = dataService.httpCall(ncc.Customer.data,"http://localhost/crm-api/index.php/api/Customer/","POST");
        dataService.doPost("http://localhost/crm-api/index.php/api/Customer/",ncc.Customer.data)
        .then(
            function(response) {                
                //console.log(response);
                var data = angular.fromJson(response.data); 
                //alert(data);
                console.log(data);
                ncc.alerts.init(true,data.error,data.msg);                
                
            },
            function(errResponse){
                //console.error('Error while fetching contacts');
                //alert(errResponse);
                console.log(errResponse);
            }
        );        
        /*response.then(function(result){      
            console.log(result);
            alert(JSON.stringify(result));
       },
       function(result){
               alert("error" + angular.toJson(result));
       });   */
    };

    ncc.resetForm = function(){
        ncc.Customer.data.lastName = "";
        ncc.Customer.data.firstName = "";
        ncc.Customer.data.cellPhone = "";
        ncc.Customer.data.bdate = "";
        ncc.Customer.data.disPic = "";
    };

    ncc.initDatePicker = function(){
        angular.element('#cdp').datepicker({format: 'mm/dd/yyyy'});
        //alert(angular.element('#cdp'));
    };

    ncc.init = function(){
        console.clear();
        console.log("initialising controller...");
        ncc.getLastNames();
        ncc.getDisplyImages();
        alertService.init(false,false,"");
        //ncc.initDatePicker();
    };
    ncc.init();
});

app.controller("updateCustomerController", function(dataService, alertService, $stateParams){

    var ucc = this;
    ucc.Customer2Fetch = {};
    ucc.Customer2Update = {};
    ucc.alerts = alertService;

   
    ucc.convertDate = function()
    {
        var dtstr = ucc.Customer2Fetch.bdate;
        var dtArr = dtstr.split("-");
        var tdate = new Date();
        tdate.setFullYear(parseInt(dtArr[0]));
        tdate.setMonth(parseInt(dtArr[1])-1);
        tdate.setDate(parseInt(dtArr[2]));
        ucc.Customer2Fetch.tbdate = tdate;
        ucc.Customer2Update = angular.copy(ucc.Customer2Fetch);
        //alert(ucc.Customer2Update.tbdate < ucc.Customer2Fetch.tbdate);

    };

    ucc.getCustomer = function(){
        ucc.Customer2Fetch.custId = $stateParams.custId;        
        var url = "http://localhost/crm-api/index.php/api/Customer/" + ucc.Customer2Fetch.custId;
        console.log("fetching customer...");
        dataService.doGet(url,{}).then(function(response){            
            console.log(response.data.data);
            var data = angular.fromJson(response.data);
            ucc.Customer2Fetch = data.data;
            console.log(ucc.Customer2Fetch);
            console.log("customer fetched ...");
            ucc.convertDate();
        },
        function(errResponse){
            console.error('Error while fetching contacts');
        });
    }; 
        
    ucc.dataChanged = function(){
        var changed = false;        
        if(ucc.Customer2Update.lastName != ucc.Customer2Fetch.lastName || 
           ucc.Customer2Update.firstName != ucc.Customer2Fetch.firstName ||
           ucc.Customer2Update.cellPhone != ucc.Customer2Fetch.cellPhone ||
           ucc.Customer2Update.tbdate < ucc.Customer2Fetch.tbdate ||
           ucc.Customer2Update.disPic != ucc.Customer2Fetch.disPic  )
        {
            changed = true;
        }
       
        return changed;
    };
    
    ucc.updateCustomer = function(){
        var tdt = ucc.Customer2Update.tbdate.getFullYear() + "-";
        var m =  ((parseInt(ucc.Customer2Update.tbdate.getMonth()) + 1));
        m = (m < 10 ) ? "0" + m : m;
        tdt += m + "-";
        var d = parseInt(ucc.Customer2Update.tbdate.getDate());
        d = (d < 10) ? "0" + d : d;
        tdt +=  d;
        ucc.Customer2Update.bdate = tdt;
        console.log("updating customer...");
        //console.log(ucc.Customer2Update);
        dataService.doPut("http://localhost/crm-api/index.php/api/Customer/",ucc.Customer2Update)
        .then(function(response){
            console.log(response);
            var data = angular.fromJson(response.data); 
            //alert(data);
            console.log(data);
            ucc.alerts.init(true,data.error,data.msg);                 
        },function(errResponse){
            console.error('Error while fetching contacts');
            alert(errResponse);
        });
    }

    ucc.init = function()
    {
        console.log("initialising ...");
        ucc.alerts.init(false,false,"");
        //alert($stateParams.custId);
        ucc.getCustomer();
    };
    ucc.init();

});

app.controller("deleteCustomerController", function(dataService, alertService, $stateParams){
    var dcc = this;
    dcc.Customer2Delete = {};
    dcc.alerts = alertService;
    dcc.convertDate = function()
    {
        var dtstr = ucc.Customer2Delete.bdate;
        var dtArr = dtstr.split("-");
        var tdate = new Date();
        tdate.setFullYear(parseInt(dtArr[0]));
        tdate.setMonth(parseInt(dtArr[1])-1);
        tdate.setDate(parseInt(dtArr[2]));
        dcc.Customer2Delete.tbdate = tdate;
            
    };

    dcc.getCustomer = function(){
        dcc.Customer2Delete.custId = $stateParams.custId;        
        var url = "http://localhost/crm-api/index.php/api/Customer/" + dcc.Customer2Delete.custId;
        console.log("fetching customer...");
        dataService.doGet(url,{}).then(function(response){            
            console.log(response);
            var data = angular.fromJson(response.data);
            dcc.Customer2Delete = data.data;  
            console.log(dcc.Customer2Delete);
            console.log("customer fetched ...");
            dcc.convertDate();
        },
        function(errResponse){
            console.error('Error while fetching contacts');
        });
    };

    dcc.deleteCustomer = function(){
        var url = "http://localhost/crm-api/index.php/api/Customer/" + dcc.Customer2Delete.custId;
        console.log("deleting cutomer ...") ; 
        dataService.doDelete(url,{}).then(function(response){            
            console.log(response);
            var data = angular.fromJson(response.data);
            dcc.alerts.init(true,data.eror,data.msg);
            console.log("customer deleted ...");            
        },
        function(errResponse){
            console.error('Error while fetching contacts');
        });        
    }

    dcc.init = function(){
        console.clear();
        console.log("initialising ...");
        dcc.alerts.init(false,false,"");
        dcc.getCustomer();
    }
    dcc.init();
});