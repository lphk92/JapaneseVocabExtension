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
};

function retrieveList(listName)
{
    return localStorage[listName];
};
