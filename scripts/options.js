function saveOptions()
{
    var readingQuestion = document.getElementById("readingQuestion");
    var readingAnswer = document.getElementById("readingAnswer");

    localStorage["showReadingQuestion"] = readingQuestion.checked;
    localStorage["showReadingAnswer"] = readingAnswer.checked;
}

function loadOptions()
{
    var showReadingQuestion = localStorage["showReadingQuestion"];
    var showReadingAnswer = localStorage["showReadingAnswer"];

    var readingQuestion = document.getElementById("readingQuestion");
    var readingAnswer = document.getElementById("readingAnswer");

    readingQuestion.checked = showReadingQuestion == "true";
    readingAnswer.checked = showReadingAnswer == "true";
}

function loadListNames()
{
    var lists = getListNames();
    var tableString = "<tr class=\"header\"><th>Lists</th></tr>";
    for (var i = 0 ; i < lists.length ; i++)
    {
       tableString += "<tr><td>" + lists[i] + "</td></tr>" + "\n"; 
    }
    document.getElementById("allListsTable").innerHTML = tableString;
}

function loadList(list)
{
    //Note: By first writing all of the new HTML into a string, and then only setting the innerHTML
    //      element once, it takes much less time to load a list
    tableString = "<tr class=\"header\"><th>Kanji</th><th>Reading</th><th>Meaning</th></tr>";
    for (var i = 0 ; i < list.length ; i++)
    {
        tableString += "<tr><td><div contenteditable>" + list[i]["kanji"] + "</div></td><td><div contenteditable>" + list[i]["reading"] + "</div></td><td><div contenteditable>" + list[i]["meaning"] + "</div></td></tr>\n";
    }
    document.getElementById("currentListTable").innerHTML = tableString;
}

loadListNames();
document.addEventListener('DOMContentLoaded', loadOptions);

$("#save").click(function(){
    saveOptions();
});

$("#allListsTable td").click(function(){ 
    var listName = this.innerHTML;
    loadList(retrieveList(listName));
    $("#allListsTable td").removeClass("selected");
    $(this).addClass("selected");
});

