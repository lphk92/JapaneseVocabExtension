var hiraDict = {"あ":"a", "い":"i", "う":"u", "え":"e", "お":"o",
            "か":"ka", "き":"ki", "く":"ku", "け":"ke", "こ":"ko",
            "さ":"sa", "し":"shi", "す":"su", "せ":"se", "そ":"so",
            "た":"ta", "ち":"chi", "つ":"tsu", "て":"te", "と":"to",
            "な":"na", "に":"ni", "ぬ":"nu", "ね":"ne", "の":"no",
            "は":"ha", "ひ":"hi", "ふ":"hu", "へ":"he", "ほ":"ho",
            "ま":"ma", "み":"mi", "む":"mu", "め":"me", "も":"mo",
            "や":"ya", "ゆ":"yu", "よ":"yo",
            "ら":"ra", "り":"ri", "る":"ru", "れ":"re", "ろ":"ro",
            "わ":"wa", "を":"wo", "ん":"n",
            "が":"ga", "ぎ":"gi", "ぐ":"gu", "げ":"ge", "ご":"go",
            "ざ":"za", "じ":"ji", "ず":"zu", "ぜ":"ze", "ぞ":"zo",
            "だ":"da", "ぢ":"ji", "づ":"zu", "で":"de", "ど":"do",
            "ば":"ba", "び":"bi", "ぶ":"bu", "べ":"be", "ぼ":"bo",
            "ぱ":"pa", "ぴ":"pi", "ぷ":"pu", "ぺ":"pe", "ぽ":"po"};

var kataDict = {"ア":"a", "イ":"i", "ウ":"u", "エ":"e", "オ":"o",
            "カ":"ka", "キ":"ki", "ク":"ku", "ケ":"ke", "コ":"ko",
            "サ":"sa", "シ":"shi", "ス":"su", "セ":"se", "ソ":"so",
            "タ":"ta", "チ":"chi", "ツ":"tsu", "テ":"te", "ト":"to",
            "ナ":"na", "ニ":"ni", "ヌ":"nu", "ネ":"ne", "ノ":"no",
            "ハ":"ha", "ヒ":"hi", "フ":"hu", "ヘ":"he", "ホ":"ho",
            "マ":"ma", "ミ":"mi", "ム":"mu", "メ":"me", "モ":"mo",
            "ヤ":"ya", "ユ":"yu", "ヨ":"yo",
            "ラ":"ra", "リ":"ri", "ル":"ru", "レ":"re", "ロ":"ro",
            "ワ":"wa", "ヲ":"wo", "ン":"n",
            "ガ":"ga", "ギ":"gi", "グ":"gu", "ゲ":"ge", "ゴ":"go",
            "ザ":"za", "ジ":"ji", "ズ":"zu", "ゼ":"ze", "ゾ":"zo",
            "ダ":"da", "ヂ":"ji", "ヅ":"zu", "デ":"de", "ド":"do",
            "バ":"ba", "ビ":"bi", "ブ":"bu", "ベ":"be", "ボ":"bo",
            "パ":"pa", "ピ":"pi", "プ":"pu", "ぺ":"pe", "ポ":"po"};

function romanjify(kana)
{
    // Transliterate characters
    var romanji = "";
    for(var i = 0 ; i < kana.length ; i++)
    {
        document.write("<br>\nCurrent character: " + kana[i]);
        if(hiraDict[kana[i]])
        {
            romanji += hiraDict[kana[i]];
        }
        else if (kataDict[kana[i]])
        {
            romanji += kataDict[kana[i]];
        }
        else
        {
            romanji += kana[i];
        }
    }

    // Handle small tsu
    for (var i = 0 ; i < romanji.length-1 ; i++)
    {
        if(romanji[i] == "っ" || romanji[i] == "ッ")
        {
           romanji = romanji.substr(0, i) + romanji[i+1] + romanji.substr(i+1);
        }
        if(romanji[i] == "ゃ" || romanji[i] == "ャ")
        {
           romanji = romanji.substr(0, i-1) + "a" + romanji.substr(i+1);
           i--; // The length of romanji decreases by 1, so we account for that
        }
        if(romanji[i] == "ゅ" || romanji[i] == "ュ")
        {
           romanji = romanji.substr(0, i-1) + "u" + romanji.substr(i+1);
           i--;
        }
        if(romanji[i] == "ょ" || romanji[i] == "ョ")
        {
           romanji = romanji.substr(0, i-1) + "o" + romanji.substr(i+1);
           i--;
        }
    }

    return romanji;
}
