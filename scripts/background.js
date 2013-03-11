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
        
        if (entry.kanji == "" || entry.kanji == null)
        {
            var question = entry.reading;
            var answer = entry.reading;
        }
        else
        {      
            var question = showReadingQuestion ? entry.kanji + " (" + entry.reading + ")" : entry.kanji;
            var answer = showReadingAnswer ? entry.kanji + " (" + entry.reading + ")" : entry.kanji;            
        }

        var input = prompt(question);
        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + entry.meaning);
    }
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
updateIcon();
