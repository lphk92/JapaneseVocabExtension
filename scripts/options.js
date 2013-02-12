function saveOptions()
{
    var readingQuestion = document.getElementById("readingQuestion");
    var readingAnswer = document.getElementById("readingAnswer");

    localStorage["showReadingQuestion"] = readingQuestion.checked;
    localStorage["showReadingAnswer"] = readingAnswer.checked;

    //alert ("Options saved");
}

function loadOptions()
{
    var showReadingQuestion = localStorage["showReadingQuestion"];
    var showReadingAnswer = localStorage["showReadingAnswer"];

    var readingQuestion = document.getElementById("readingQuestion");
    var readingAnswer = document.getElementById("readingAnswer");

    readingQuestion.checked = showReadingQuestion == "true";
    readingAnswer.checked = showReadingAnswer == "true";

    //alert("Options loaded");
}

function loadList(list)
{
    var editTable = document.getElementById("currentListTable");
    editTable.innerHTML = "<tr class=\"headerRow\"><th>Kanji</th><th>Reading</th><th>Meaning</th></tr><tbody>";
    for (var i = 0 ; i < list.length ; i++)
    {
        var row = "<tr><td>" + list[i]["kanji"] + "</td><td>" + list[i]["reading"] + "</td><td>" + list[i]["meaning"] + "</td></tr>\n";
        editTable.innerHTML += row;
    }
    editTable.innerHTML += "</tbody>";
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('#save').addEventListener('click', saveOptions);

var lists = getListNames();
var allListsTable = document.getElementById("allListsTable");
for (var i = 0 ; i < lists.length ; i++)
{
   allListsTable.innerHTML += "<tr><td>" + lists[i] + "</td></tr>" + "\n"; 
}
alert("list names loaded");

loadList(retrieveList("default_Verbs"));
