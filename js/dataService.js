app.service("dataService", function($http){
    
    this.httpCall = function(data,url,method){
        var response = null;
        if(method == "POST")    
            response = $http.post(url,data);
        else if (method == "GET")    
            response = $http.get(url,data);
        else if(method == "PUT")    
            response = $http.put(url,data);
        else if(method == "DELETE")    
            ressponse = $http.delete(url,data);
            return response;
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