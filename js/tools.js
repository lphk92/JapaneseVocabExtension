function updateIcon()
{
    var active = localStorage["active"] == "true";

    var iconPath = active ? "rsc/icon-active.png" : "rsc/icon-inactive.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;

    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
}

function versionUpdate(version)
{
    var currVersion = localStorage["version"];

    // Adjust list indices if necessary
    var listNames = getListNames();
    var lists = [];
    for (var i = 0 ; i < listNames.length ; i++)
    {
        lists[i] = retrieveList(listNames[i]);
        var minIndex = -1
        for (var j = 0 ; j < lists[i].list.length ; j++)
        {
            var index = lists[i].list[j].index;
            if (minIndex < 0 || index < minIndex)
                minIndex = index;
        }
        if (minIndex > 0)
        {
            for (var j = 0 ; j < lists[i].list.length ; j++)
            {
                lists[i].list[j].index -= minIndex;
            }
        }
    }

    if (currVersion != version)
    {
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
        if (localStorage.getItem("active") == null)
            localStorage["active"] = "true";

        localStorage["version"] = version;
    }
}
