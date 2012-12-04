var currentVersion = "1.3";

if (localStorage["version"] != currentVersion)
{
    // Load up verb list
    var verbList = generateVerbList();
    storeList("Verbs", verbList);
    localStorage["version"] = currentVersion;
    alert("Verb list loaded due to version mismatch");
}
else
{
    alert("Version check passed");
}
