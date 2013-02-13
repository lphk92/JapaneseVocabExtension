var currentList;

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

    // Add the selection listener to each of the lists
    $("#allListsTable td").click(function(){ 
        var listName = this.innerHTML;
        loadList(retrieveList(listName));
        $("#allListsTable td").removeClass("selected");
        $(this).addClass("selected");
    });
}

function loadList(vocabList)
{
    currentList = vocabList;
    var list = vocabList.list;
    //Note: By first writing all of the new HTML into a string, and then only setting the innerHTML
    //      element once, it takes much less time to load a list
    tableString = "<tr class=\"header\"><th>Kanji</th><th>Reading</th><th>Meaning</th></tr>";
    for (var i = 0 ; i < list.length ; i++)
    {
        tableString += "<tr><td><div contenteditable>" + list[i]["kanji"] + "</div></td>"
        tableString += "<td><div contenteditable>" + list[i]["reading"] + "</div></td>"
        tableString += "<td><div contenteditable>" + list[i]["meaning"] + "</div></td></tr>\n";
    }
    document.getElementById("currentListTable").innerHTML = tableString;
}

function addEntry()
{
    var kanji = $("#kanji").val();
    var reading = $("#reading").val();
    var meaning = $("#meaning").val();

    var entry = {"kanji": kanji, "reading": reading, "meaning": meaning, "visible": true};
    currentList.push(entry);

    var rowString = "<tr><td><div contenteditable>" + kanji + "</div></td>"
    rowString += "<td><div contenteditable>" + reading + "</div></td>"
    rowString += "<td><div contenteditable>" + meaning + "</div></td></tr>\n";
    document.getElementById("currentListTable").innerHTML += rowString;
}

loadListNames();
document.addEventListener('DOMContentLoaded', loadOptions);

$("#save").click(function(){
    saveOptions();
});

$("#addEntry").click(function(){
    addEntry();
});

$("#addList").click(function(){
    var listName = $("#newListName").val();
    var list = {"name":listName, "list":[]};
    storeList(listName, list);
    loadListNames();
});
