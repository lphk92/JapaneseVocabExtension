function loadState()
{
    var active = getLocalBoolean("active");
    var iconPath = active ? "icon-active.png" : "icon.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;
    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
};

function getLocalBoolean(key)
{
    return localStorage[key] == "true" ? true : false;
};

var getRandomEntry = function()
{
    var num = Math.floor(Math.random() * verbList.length);
    return verbList[num];
};

var quizFunction = function(tab)
{
    if (localStorage["active"] == "true")
    {
        var entry = getRandomEntry();
        var kanji = entry.kanji;
        var reading = " (" + entry.reading + ")";

        var showReadingQuestion = localStorage["showReadingQuestion"];
        var showReadingAnswer = localStorage["showReadingAnswer"];
        
        var question = showReadingQuestion == "true" ? kanji + reading : kanji;
        var answer = showReadingAnswer == "true" ? kanji + reading : kanji;

        var input = prompt(question);

        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + entry.meaning);
    }
};

var toggleActive = function(tab)
{
    var currVal = getLocalBoolean("active");
    localStorage["active"] = !currVal;
    loadState();
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
chrome.browserAction.onClicked.addListener(toggleActive);

loadState();
