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
    
        var questionKanji = localStorage["questionKanji"] == "true";
        var questionKana = localStorage["questionKana"] == "true";
        var questionRomanji = localStorage["questionRomanji"] == "true";

        var answerKanji = localStorage["answerKanji"] == "true";
        var answerKana = localStorage["answerKana"] == "true";
        var answerRomanji = localStorage["answerRomanji"] == "true";

        var quizMode = localStorage["quizMode"];

        var q = "";
        if (questionKanji) q += entry.kanji;
        if (questionKana && questionRomanji) q += " (" + entry.reading + ", " + romanjify(entry.reading) + ")";
        else if (questionKana) q += " (" + entry.reading + ")";
        else if (questionRomanji) q += " (" + romanjify(entry.reading) + ")";

        var a = "";
        if (answerKanji) a += entry.kanji;
        if (answerKana && answerRomanji) a += " (" + entry.reading + ", " + romanjify(entry.reading) + ")";
        else if (answerKana) a += " (" + entry.reading + ")";
        else if (answerRomanji) a += " (" + romanjify(entry.reading) + ")";

        if (quizMode == "normal")
        {
            var question = q; 
            var answer = a;            
            var solution = entry.meaning;
        }
        else if (quizMode == "kanji")
        {
            var question = entry.kanji;
            var answer = entry.kanji;
            var solution = reading;
        }

        var input = prompt(question);
        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + solution);
    }
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
updateIcon();
