//All your JS code goes here
var JSonfile = "https://raw.githubusercontent.com/Wils0751/Midterm/gh-pages/js/users.json",//Defining all the variables at begining of code
    JSONdata =[],
    loadbutton ={},// 
    morebutton ={},
    counter = 0,
    tempFlag =0,
    totalsize;

document.addEventListener("DOMContentLoaded", function(event){// Working with the clickable buttons
    loadbutton = document.querySelector("#loadBtn"),
    morebutton = document.querySelector("#showBtn"),
	newdata = document.querySelector("#output1"),
	olddata = document.querySelector("#output2"),
    loadbutton.addEventListener("click", loaddata),
    morebutton.addEventListener("click", showmore);
});
    
function loaddata() {// Fetching JSON Data
    var req = new XMLHttpRequest();
    req.open('GET', JSonfile, false);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200)       {
        JSONdata=JSON.parse(req.responseText);
      }
    }
    if (loadbutton.className === 'btn enabled') {
        req.send(null);
		Loadbutton();
    }

}

function Loadbutton() { // Next step after load button click
	loadbutton.className = "btn disabled";
    loadbutton.removeEventListener('click', loaddata);
    morebutton.className = "btn enabled";
}

function showmore() {// Get show next button working
    if (morebutton.innerHTML != 'Show Next') {
        morebutton.innerHTML = 'Show Next';
    }

    if (counter < (JSONdata.length)) {
        setFeedByIndex(counter);
    }
    if (counter > (JSONdata.length - 1)) {
        morebutton.removeEventListener('click', next);
    }
    counter++;
}
function setFeedByIndex(index) {// Display Data o
    newdata.innerHTML = '<img src="' + JSONdata[index]['image'] + '"><h2>' + toTitleCase(JSONdata[index]['firstName']) + ' ' + toTitleCase(JSONdata[index]['lastName']) + '</h2><a href="mailto:' + JSONdata[index]['email'] + '">' + JSONdata[index]['email'] + '</a></div>';
    if (counter != 0) {
        var data = olddata.innerHTML;
        data = data + '<div class="oldData"><div><img src="' + JSONdata[index - 1]['thumbnail'] + '"><a href="mailto:' + JSONdata[index - 1]['email'] + '">' + toTitleCase(JSONdata[index - 1]['firstName']) + ' ' + toTitleCase(JSONdata[index - 1]['lastName']) + '</a></div></div>';
        olddata.innerHTML = data;
    }
    if (tempFlag > 2) {
       olddata.removeChild(olddata.childNodes[1]);
    }
    tempFlag++;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

