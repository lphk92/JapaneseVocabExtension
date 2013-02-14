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
    // First, clear the table displaying current list contents, since this may change
    document.getElementById("currentListTable").innerHTML = "";

    var listNames = getListNames();
    var tableString = "<tr class=\"header\"><th>Lists</th></tr>";
    for (var i = 0 ; i < listNames.length ; i++)
    {
        if (listNames[i] == currentListName())
        {
            tableString += "<tr><td class=\"selected\">" + listNames[i] + "</td></tr>" + "\n"; 
            loadList(retrieveCurrentList());
        }
        else
        {
            tableString += "<tr><td>" + listNames[i] + "</td></tr>" + "\n"; 
        }
    }
    document.getElementById("allListsTable").innerHTML = tableString;

    // Add the selection listener to each of the lists
    $("#allListsTable td").click(function(){ 
        var listName = this.innerHTML;
        loadList(retrieveList(listName));
        $("#allListsTable td").removeClass("selected");
        $(this).addClass("selected");

        setCurrentList(listName);
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
        tableString += "<tr><td>" + list[i]["kanji"] + "</td>"
        tableString += "<td>" + list[i]["reading"] + "</td>"
        tableString += "<td>" + list[i]["meaning"] + "</td></tr>\n";
    }
    document.getElementById("currentListTable").innerHTML = tableString;

    // Add the selection listener to each of the entries 
    $("#currentListTable tr").click(function(){ 
        if ($(this).hasClass("selected"))
        {
            $(this).removeClass("selected");
        }
        else
        {
            $(this).addClass("selected");
        }
    });
}

function addEntry()
{
    var kanji = $("#kanji").val();
    var reading = $("#reading").val();
    var meaning = $("#meaning").val();

    var entry = {"kanji": kanji, "reading": reading, "meaning": meaning, "visible": true};
    currentList.list.push(entry);
    storeList(currentList.name, currentList);

    var rowString = "<tr><td>" + kanji + "</td>"
    rowString += "<td>" + reading + "</td>"
    rowString += "<td>" + meaning + "</td></tr>\n";
    document.getElementById("currentListTable").innerHTML += rowString;

    $("#kanji").val("");
    $("#reading").val("");
    $("#meaning").val("");
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
    if (listName == "" || listName == null)
    {
        alert("Please enter a name before creating a new list.");
    }
    else
    {
        var list = {"name":listName, "list":[]};
        storeList(listName, list);
        loadListNames();
    }
});

$("#deleteList").click(function(){
    var conf = confirm("Are you sure you want to delete the list \"" + currentListName() + "\"? You will not be able to undo this operation.");
    if (conf)
    {
        deleteList(currentListName());
        loadListNames();
    }
});

$("#deleteEntries").click(function(){
    //TODO: Write function for deleting the selected entries 
});
