//All your JS code goes here
var req = new XMLHttpRequest ();
var newdata= document.querySelector("#output1");
var olddata=document.querySelector("#output2");
var loadbutton=document.querySelector("#loadBtn");
var morebutton=document.querySelector("#showBtn");
var dataloaded =false;
var counter={};
var counter_index=0;

document.addEventListener("DOMContentLoaded", function);
loadbutton.addEventListener("click",loaddata);//Click event

function button(){

  loadbutton.classList.remove("enabled");
  loadbutton.classList.add("disabled");
  morebutton.classList.remove("disabled");
  morebutton.classList.add("enabled");
  loaddata.removeEventListener("click",button);
  morebutton.addEventListener("click",nextdata);
    
}
function loaddata(){
   if (!dataloaded)
   {
       dataloaded=true;
        req.open('GET', 'js/users.json', false); 
        req.send(); 
        req.onreadystatechange = function( )
        { 
            if(req.readyState == 4 && req.status == 200)
            {
                    content = JSON.parse( req.responseText );
                }
            }
        }
    req.send(null)
    }
function nextdata() //This is for scrolling through the data.  Easy stuff.
{
    var index, oldboxtext, con_temp;//In order: An index for scrolling through archived data, the data for the archived data output, a variable for legibility.
    if (counter_index < counter.length)
    {
        con_temp=counter[counter_index];
        newinfo.innerHTML="<img src='"+con_temp.image+"'\><h2>"+nameparse(con_temp.firstName,con_temp.lastName)+"</h2><a href='mailto://"+con_temp.email+"'>"+con_temp.email+"</a>";//Writing new data to the new data box.
        oldboxtext="";
        for (var index=counter_index-3;index<counter_index;index++) //Looping through the three previous name entries.
        {
            if (index >= 0)//The first few boxes could have an array index in the negatives, so skip those.
            {
                con_temp=counter[index];//Just to make the next line a little cleaner to read.
                oldboxtext=oldboxtext+"<div><img src='"+con_temp.thumbnail+"'\><a href='mailto://"+con_temp.email+"'>"+nameparse(con_temp.firstName,con_temp.lastName)+"</a></div>";
            }
        }
        olddata.innerHTML=oldboxtext;//OuTPUT to old box.
        if(counter_index==0)//After the first clickthrough, let's change the name.
        {
            nextbutton.innerHTML="Show Next";
        }
        counter_index++;
    }
    else
    {
        morebutton.classList.add("btn disabled");
        morebutton.classList.remove("btn enabled");
    }
}

function nameparse(first, last)//Breaking up converting the names to proper name case; broken out here simply for legibility.
{
    return first.substring(0,1).toUpperCase()+first.substring(1,first.length)+" "+last.substring(0,1).toUpperCase()+last.substring(1,last.length);
}