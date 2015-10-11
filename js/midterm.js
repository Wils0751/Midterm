//All your JS code goes here
window.onload =function();
 alert(" The page has loaded")
var loadbutton

document.querySelector("#loadBtn").addEventListener("click",function();
$.getJSON("user.json",function(result){
    $.each(result,function(i, field){
        $("div").append(field + " ");
    })
});

 
    
    
    