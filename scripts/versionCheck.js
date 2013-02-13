var currentVersion = "1.4";
alert("Performing version check...");

if (localStorage["version"] != currentVersion)
{
    // Load up verb list
    alert("Mismatch!");
    var verbList = generateVerbList();
    storeDefaultList("Verbs", verbList);
    localStorage["version"] = currentVersion;
    alert("Verb list loaded due to version mismatch");
}
else
{
    alert("Version check passed");
}
