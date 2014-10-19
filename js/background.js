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

        var left = " (";
        var right = ")";
        if (entry.kanji.trim() == "")
        {
            left = "";
            right = "";
        }

        var q = "";
        if (questionKanji) q += entry.kanji;
        if (questionKana && questionRomanji) q += left + entry.reading + ", " + romanjify(entry.reading) + right;
        else if (questionKana) q += left + entry.reading + right;
        else if (questionRomanji) q += left + romanjify(entry.reading) + right;

        var a = "";
        if (answerKanji) a += entry.kanji;
        if (answerKana && answerRomanji) a += left + entry.reading + ", " + romanjify(entry.reading) + right;
        else if (answerKana) a += left + entry.reading + right;
        else if (answerRomanji) a += left + romanjify(entry.reading) + right;

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
            var solution = entry.reading;
        }

        var input = prompt(question);
        alert(answer + "\n\nYou answered: " + input + "\nCorrect Answer: " + solution);
    }
};

versionUpdate("3.0.0");
chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
updateIcon();
