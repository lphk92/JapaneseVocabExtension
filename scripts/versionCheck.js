var currentVersion = "1.4";
//alert("Performing version check...");

if (localStorage["version"] != currentVersion)
{
    // Load up verb list
    var verbList = generateVerbList();
    storeDefaultList("Verbs", verbList);
    localStorage["version"] = currentVersion;
}
else
{
    //alert("Version check passed");
}
