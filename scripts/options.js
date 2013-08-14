$(document).ready(function() {
    localStorage["temp"] = "";
    loadListNames();
    loadOptions();

    $("#clearFile").hide();

    $("#importFile").change(function() {
        readFileAsText(this.files[0]);
        $("#fileButton").text(this.files[0].name);
        $("#clearFile").show();
    });

    $("#fileButton").click(function() {
        $("#importFile").trigger("click");
    });

    $("#clearFile").click(function() {
        localStorage["temp"] = "";
        $("#fileButton").text("Select a file...");
        $(this).hide();
    });
});

function saveOptions()
{
    localStorage["showReadingQuestion"] = $("#readingQuestion").is(":checked");
    localStorage["showReadingAnswer"] = $("#readingAnswer").is(":checked");
    localStorage["quizMode"] = $("#mode").val();
    alert("Options Saved!");
}

function loadOptions()
{
    $("#readingQuestion").prop('checked', localStorage["showReadingQuestion"] == "true");
    $("#readingAnswer").prop('checked', localStorage["showReadingAnswer"] == "true");

    if (localStorage["quizMode"])
    {
        $("#mode").val(localStorage["quizMode"]);
    }
    else
    {
        // If it isn't stored, then store it immediately
        localStorage["quizMode"] = $("#mode").val();
    }
}

function loadListNames()
{
    try
    {
        $("#listNames").html("");
        var listNames = getListNames();
        for (var i = 0 ; i < listNames.length ; i++)
        {
            var newItem = document.createElement("div");
            $(newItem).html(listNames[i]);
            $(newItem).addClass("list-name");

            if (listNames[i] == currentListName())
            {
                $(newItem).addClass("selected");
                loadList(listNames[i]);
            }

            // Add selection listener
            $(newItem).click(function(){
                var listName = this.innerHTML;
                $(".list-name").removeClass("selected");
                $(this).addClass("selected");
                loadList(listName);
            });

            $("#listNames").append(newItem);
        }
    }
    catch(e)
    {
        alert("Error: " + e.message);
    }
}

function loadList(listName)
{
    setCurrentList(listName);
    var list = retrieveList(listName).list;
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
        $(this).toggleClass("selected");
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

    loadList(currentList.name);

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


function readFileAsText(file)
{
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) 
    {
        var list = csvToVocabList(event.target.result);
        if(list)
        {
            var listString = JSON.stringify(list);
            localStorage["temp"] = listString;
        }
        else
        {
            $("#clearFile").trigger('click');
        }
    };
}


$("#save").click(function(){ saveOptions(); });
$("#addEntry").click(function(){ addEntry(); });
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
            localStorage["temp"] = "";
        }

        $("#newListName").val("");
        $("#clearFile").trigger("click");

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

$("#renameList").click(function(){
    var newName = prompt("Enter new name for list");
    if (newName)
    {
        renameList(currentListName(), newName);
        loadListNames();
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

    loadList(retrieveCurrentList().name);
});
