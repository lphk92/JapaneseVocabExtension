function getRandomEntry()
{
    var num = Math.floor(Math.random() * retrieveCurrentList().list.length);
    return retrieveCurrentList().list[num];
};

function quizFunction(tab)
{
    if (localStorage["active"] == "true")
    {
        entry = getRandomEntry();
    
        var showReadingQuestion = localStorage["showReadingQuestion"] == "true";
        var showReadingAnswer = localStorage["showReadingAnswer"] == "true";
        var quizMode = localStorage["quizMode"];

        if (quizMode == "normal")
        {
            var question = showReadingQuestion ? entry.kanji + " (" + entry.reading + ")" : entry.kanji;
            var answer = showReadingAnswer ? entry.kanji + " (" + entry.reading + ")" : entry.kanji;            
            var solution = entry.meaning;
        }
        else if (quizMode == "kanji")
        {
            var question = entry.kanji;
            var answer = entry.kanji;
            var solution = entry.reading;
        }

        var input = prompt(question);
        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + solution);
    }
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
updateIcon();
