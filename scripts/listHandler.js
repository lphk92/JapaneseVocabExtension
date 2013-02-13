function storeList(listName, list)
{
    var fullListName = "list_" + listName;
    if (localStorage[fullListName] != null)
    {
        alert("List \"" + listName + "\" already exists");
        return;
    }

    var stringifiedList = JSON.stringify(list);
    localStorage[fullListName] = stringifiedList;
    alert("List \"" + listName + "\" successfully stored.");
}

function retrieveList(listName)
{
    var fullListName = "list_" + listName;
    var stringifiedList = localStorage[fullListName];
    if (stringifiedList == null)
    {
        alert("List \"" + listName + "\" does not exist");
        return;
    }

    var list = JSON.parse(stringifiedList);
    return list;
}

function storeDefaultList(listName, list)
{
    storeList("default_"+listName, list);
}

function retrieveDefaultList(listName, list)
{
    return retrieveList("default_"+listName, list);
}

function getListNames()
{
    var listNames = new Array();
    var indexCounter = 0;
    for (var i = 0; i < localStorage.length ; i++)
    {
        var key = localStorage.key(i); 
        if (key.indexOf("list_") == 0)
        {
            listNames[indexCounter] = key.replace("list_", "");
            indexCounter++;
        }
    }

    return listNames;
}
