function updateIcon()
{
    var active = localStorage["active"] == "true";

    var iconPath = active ? "rsc/icon-active.png" : "rsc/icon.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;

    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
}

function versionUpdate(version)
{
    var currVersion = localStorage["version"];
    if (currVersion != version)
    {
        localStorage["version"] = version;
        // Preserve old lists if necessary
        /*var listNames = getListNames();
        var lists = new Array();
        for (var i = 0 ; i < listNames.length ; i++)
        {
            lists[i] = retrieveList(listNames[i]);
        }*/

        // default settings
        if (localStorage.getItem("questionKanji") == null)
            localStorage["questionKanji"] = "true";
        if (localStorage.getItem("questionKana") == null)
            localStorage["questionKana"] = "true";
        if (localStorage.getItem("questionRomanji") == null)
            localStorage["questionRomanji"] = "true";

        if (localStorage.getItem("answerKanji") == null)
            localStorage["answerKanji"] = "true";
        if (localStorage.getItem("answerKana") == null)
            localStorage["answerKana"] = "true";
        if (localStorage.getItem("answerRomanji") == null)
            localStorage["answerRomanji"] = "true";

        if (localStorage.getItem("quizMode") == null)
            localStorage["quizMode"] = "Normal";
    }
}
