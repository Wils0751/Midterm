//All your JS code goes here
var JSonfile = "https://raw.githubusercontent.com/Wils0751/Midterm/gh-pages/js/users.json",
    JSONdata ={},
    loadbutton ={},
    morebutton ={},
    counter = 0,
    tempFlag =0,
    totalsize;

document.addEventListener("DOMContentLoaded", function(event){
    loadbutton = document.querySelector("#loadBtn"),
    morebutton = document.querySelector("#showBtn"),
    loadbutton.addEventListener("click", loaddata),
    morebutton.addEventListener("click", next);
});
    
function loaddata() {
    var req = new XMLHttpRequest();
    req.open('GET', JSonfile, false);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200)       {
        parseJson(req.responseText);
      }
    }
    if (loadbutton.className === 'btn enabled') {
        req.send(null);
    }

}

function parseJson(obj) {
    JSONdata = JSON.parse(obj);
    totalsize =JSONdata.length;
    loadbutton.className = "btn disabled";
    loadbutton.removeEventListener('click', loaddata);
    morebutton.className = "btn enabled";
}

function next() {
    if (morebutton.innerHTML != 'Show Next') {
        morebutton.innerHTML = 'Show Next';
    }

    if (counter < totalsize) {
        setFeedByIndex(counter);
    }
    if (counter=== (totalsize - 1)) {
        morebutton.removeEventListener('click', next);
    }
    counter++;
}
function setFeedByIndex(index) {
    var newdata = document.getElementById("output1");
    newdata.innerHTML = '<img src="' + JSONdata[index]['image'] + '"><h2>' + toTitleCase(JSONdata[index]['firstName']) + ' ' + toTitleCase(JSONdata[index]['lastName']) + '</h2><a href="mailto:' + JSONdata[index]['email'] + '">' + JSONdata[index]['email'] + '</a></div>';
    if (counter != 0) {
        var olddata = document.getElementById("output2");
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


//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city