function loadActiveState()
{
    var active = getLocalBoolean("active");

    var iconPath = active ? "icon-active.png" : "icon.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;

    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
};

function toggleActive(tab)
{
    var currVal = getLocalBoolean("active");
    localStorage["active"] = !currVal;
    loadActiveState();
};


function getLocalBoolean(key)
{
    return localStorage[key] == "true" ? true : false;
};

function getRandomEntry()
{
    var num = Math.floor(Math.random() * verbList.length);
    return verbList[num];
};

function quizFunction(tab)
{
    if (getLocalBoolean("active") == true)
    {
        var entry = getRandomEntry();
        var kanji = entry.kanji;
        var reading = " (" + entry.reading + ")";

        var showReadingQuestion = getLocalBoolean("showReadingQuestion");
        var showReadingAnswer = getLocalBoolean("showReadingAnswer");
        
        var question = showReadingQuestion ? kanji + reading : kanji;
        var answer = showReadingAnswer ? kanji + reading : kanji;

        var input = prompt(question);

        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + entry.meaning);
    }
};

storeList("verbs", verbList);

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
chrome.browserAction.onClicked.addListener(toggleActive);

loadActiveState();
