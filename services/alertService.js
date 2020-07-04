app.service("alertService", function(){
    
    this.complete = false;
    this.error = false;
    this.msg = "";
    this.init = function(c, err, m){
            this.complete = c;
            this.error  = err;
            this.msg = m;
    };
    


    this.setComplete = function(c){ this.complete = c;}
    this.setError = function(e){ this.error = e;}
    this.setMessage= function(m){this.msg =m;}

    this.isComplete = function(){return this.complete;}
    this.hasError = function(){return this.error;}
    this.getMessage = function(){return this.msg;}

});