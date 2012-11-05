var getRandomEntry = function()
{
    var num = Math.floor(Math.random() * vocablist.length);
    return vocablist[num];
};

var quizFunction = function(tab)
{
    var entry = getRandomEntry();
    var question = entry.kanji + " (" + entry.kana + ")";
    var answer = prompt(question);
    alert(question + "\n\nYou answered: " + answer + "\nCorrect Answer: " + entry.meaning);
};

chrome.tabs.onCreated.addListener(quizFunction);
chrome.tabs.onRemoved.addListener(quizFunction);
