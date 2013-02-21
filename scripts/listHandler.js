function storeList(listName, list)
{
    var fullListName = "list_" + listName;
    var stringifiedList = JSON.stringify(list);
    localStorage[fullListName] = stringifiedList;
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

function deleteList(listName)
{
    var fullListName = "list_" + listName;
    for (var i = 0; i < localStorage.length ; i++)
    {
        var key = localStorage.key(i); 
        if (key == fullListName)
        {
            localStorage.removeItem(key);
            return;
        }
    }
}

function purgeLists()
{
    var listNames = getListNames();
    for (var i = 0 ; i < listNames.length ; i++)
    {
        deleteList(listNames[i]);
    }
}

function retrieveCurrentList()
{
    return retrieveList(localStorage["currentList"]);
}

function currentListName() 
{
    return localStorage["currentList"]; 
}

function setCurrentList(listName)
{
    localStorage["currentList"] = listName;
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
