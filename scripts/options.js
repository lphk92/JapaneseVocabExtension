function saveOptions()
{
    localStorage["showReadingQuestion"] = $("#readingQuestion").is(":checked");
    localStorage["showReadingAnswer"] = $("#readingAnswer").is(":checked");
    alert("Options Saved!");
}

function loadOptions()
{
    $("#readingQuestion").prop('checked', localStorage["showReadingQuestion"] == "true");
    $("#readingAnswer").prop('checked', localStorage["showReadingAnswer"] == "true");
}

function loadListNames()
{
    // First, clear the table displaying current list contents, since this may change
    $("#currentListTable").html("");

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
    $("#allListsTable").html(tableString);

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
    var list = vocabList.list;
    //Note: By first writing all of the new HTML into a string, and then only setting the innerHTML
    //      element once, it takes much less time to load a list
    tableString = "<tr class=\"header\"><th>Kanji</th><th>Reading</th><th>Meaning</th></tr>";
    for (var i = 0 ; i < list.length ; i++)
    {
        tableString += "<tr data-index=" + list[i]["index"] + "><td>" + list[i]["kanji"] + "</td>"
        tableString += "<td>" + list[i]["reading"] + "</td>"
        tableString += "<td>" + list[i]["meaning"] + "</td></tr>\n";
    }
    $("#currentListTable").html(tableString);

    // Add the selection listener to each of the entries 
    $("#currentListTable tr:not(.header)").click(function(){ 
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
    var currentList = retrieveCurrentList();

    var index = currentList.list.length == 0 ? 0 : currentList.list[currentList.list.length - 1]["index"] + 1;
    var kanji = $("#kanji").val();
    var reading = $("#reading").val();
    var meaning = $("#meaning").val();

    var entry = {"index": index, "kanji": kanji, "reading": reading, "meaning": meaning, "visible": true};
    currentList.list.push(entry);
    storeList(currentList.name, currentList);

    loadList(currentList);

    $("#kanji").val("");
    $("#reading").val("");
    $("#meaning").val("");
}

function removeEntryFromList(vocabList, index)
{
    for (var i = 0 ; i < vocabList.list.length ; i++)
    {
        if (vocabList.list[i]["index"] == index)
        {
            vocabList.list.splice(i, 1);
            storeList(vocabList.name, vocabList);
            return;
        }
    }
}

loadListNames();
document.addEventListener('DOMContentLoaded', loadOptions);

function readFileAsText(file)
{
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
        var listString = JSON.stringify(csvToVocabList(event.target.result));
        localStorage["temp"] = listString;
    };
}

document.getElementById('importFile').addEventListener('change', function() { readFileAsText(this.files[0]); }, false);

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
        if (localStorage["temp"] != null && localStorage["temp"] != "")
        {
            var list = JSON.parse(localStorage["temp"]);
            localStorage["temp"] == "";
        }

        $("#newListName").val("");
        $("#importFile").val("");

        storeList(listName, list);
        loadListNames();
    }
});

$("#deleteList").click(function(){
    if (getListNames().length == 1)
    {
        alert("You must always have at least one list");
    }
    else
    {
        var conf = confirm("Are you sure you want to delete the list \"" + currentListName() + "\"? You will not be able to undo this operation.");
        if (conf)
        {
            deleteList(currentListName());
            setCurrentList(getListNames()[0]);
            loadListNames();
        }
    }
});

$("#deleteEntries").click(function(){
    var conf = confirm("Are you sure you want to delete the selected entries? You will not be able to undo this operation.");
    if (conf)
    {
        $("#currentListTable .selected").each(function(){
            var index = $(this).attr("data-index");
            var currentList = retrieveCurrentList();
            removeEntryFromList(currentList, index);
        });
    }

    loadList(retrieveCurrentList());
});
