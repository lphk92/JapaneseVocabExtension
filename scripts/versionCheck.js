var currentVersion = "2.0";

var version = localStorage["version"];

if (version == null)
{
    // Load up verb list
    var verbList = generateVerbList();
    storeList("Verbs", verbList);

    setCurrentList(getListNames()[0]);
    localStorage["version"] = currentVersion;
}
else if (version != currentVersion)
{
    if (version[0] == "1")
    {
        // Purge to remove depracated "default" lists from localStorage.
        purgeLists();
    }

    // Load up verb list
    var verbList = generateVerbList();
    storeList("Verbs", verbList);

    setCurrentList(getListNames()[0]);
    localStorage["version"] = currentVersion;
}
else
{
    //alert("Version check passed");
}
