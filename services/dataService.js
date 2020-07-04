app.service("dataService", function($http,$q){
    
    /*this.httpCall = function(data,url,method){
        var response = null;
        if(method == "POST")    
            this.doPost(url,data);
        else if (method == "GET")    
            this.doGet(url,data);
        else if(method == "PUT")    
            this.doPut(url,data);
        else if(method == "DELETE")    
            this.doDelete(url,data);
            
    };*/

    this.doPost = function(url, data)
    {
        var deferred = $q.defer();
        $http.post(url,data)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function(errResponse){
                //console.error('Error while fetching contacts');
                deferred.reject(errResponse);
            }
        );        
        return deferred.promise;               
    };

    this.doGet = function(url, data)
    {
        var deferred = $q.defer();        
        $http.get(url)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                deferred.reject(errResponse);
            }
        );        
        return deferred.promise;        
    };    

    this.doPut = function(url, data)
    {
        var deferred = $q.defer();
        $http.put(url,data)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                deferred.reject(errResponse);
            }
        );        
        return deferred.promise;            
    };    

    this.doDelete = function(url, data)
    {
        var deferred = $q.defer();
        $http.delete(url,data)
            .then(
            function (response) {
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while fetching contacts');
                deferred.reject(errResponse);
            }
        );        
        return deferred.promise;            
    };    

    this.revDate = function(dt)    
    {
        if(dt)
        {
            var dtArr = dt.split('-');
            if(dtArr[0].length == 4)
            {
                return dt;
            }
            else
            {
                var rstr = dtArr[2] + '-' + dtArr[1] + '-' + dtArr[0];
                return rstr;
            }
        }
    };
});