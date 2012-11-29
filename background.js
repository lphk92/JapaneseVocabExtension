var getRandomEntry = function()
{
    var num = Math.floor(Math.random() * verbList.length);
    return verbList[num];
};

var quizFunction = function(tab)
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
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
