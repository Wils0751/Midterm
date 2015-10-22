//All your JS code goes here
var JSonfile = "https://raw.githubusercontent.com/Wils0751/Midterm/gh-pages/js/users.json", //Defining all the variables at begining of code
    JSONdata = [],
    loadbutton = {}, 
    morebutton = {},
    counter = 0,
    Flag = 0;

document.addEventListener("DOMContentLoaded", function(event) { // Working with the clickable buttons
    loadbutton = document.querySelector("#loadBtn"),
        morebutton = document.querySelector("#showBtn"),
        newdata = document.querySelector("#output1"),
        olddata = document.querySelector("#output2"),
        loadbutton.addEventListener("click", loaddata),
        morebutton.addEventListener("click", showmore);
});

function loaddata() { // Fetching JSON Data
    var req = new XMLHttpRequest();
    req.open('GET', JSonfile, false);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            JSONdata = JSON.parse(req.responseText);
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

function showmore() { // Get show next button working
    if (morebutton.innerHTML != 'Show Next') {
        morebutton.innerHTML = 'Show Next';
    }

    if (counter < (JSONdata.length)) {
        Displaydata(counter);
    }
    if (counter > (JSONdata.length - 1)) {
        morebutton.removeEventListener('click', showmore);
        alert("That is all the data")
    }
    counter++;
    console.log("showmore()");
}

function Displaydata(index) { // Display Data 
    newdata.innerHTML = '<img src="' + JSONdata[index]['image'] + '"><h2>' + toTitleCase(JSONdata[index]['firstName']) + ' ' + toTitleCase(JSONdata[index]['lastName']) + '</h2><a href="mailto:' + JSONdata[index]['email'] + '">' + JSONdata[index]['email'] + '</a></div>';
    console.log(newdata.innerHTML);
    if (counter != 0) {
        var data = olddata.innerHTML;
        data = data + '<div class="oldData"><div><img src="' + JSONdata[index - 1]['thumbnail'] + '"><a href="mailto:' + JSONdata[index - 1]['email'] + '">' + toTitleCase(JSONdata[index - 1]['firstName']) + ' ' + toTitleCase(JSONdata[index - 1]['lastName']) + '</a></div></div>';
        olddata.innerHTML = data;
    }
    if (Flag > 2) {
        olddata.removeChild(olddata.childNodes[1]);
    }
    Flag++;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
//http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city