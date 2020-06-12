function loadS(p) {
    console.log('Loading...');
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = p;
    var t = $("head").append(s);
    //alert(JSON.stringify(t));
    console.log('Loaded.');    
}

function load()
{
    console.log($(document).find('script').length);
    loadS("../customers/CustomerController.js");
    console.log($(document).find('script').length);
}
document.readyState(load());