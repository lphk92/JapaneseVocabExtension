var dict = ["あ":"a", "い":"i", "う":"u", "え":"e", "お":"o"];

function romanjify(var kana)
{
    var romanji = "";
    for(var i = 0 ; i < kana.length ; i++)
    {
        romanji = romanji + dict[kana[i]];
    }
    return romanji;
}

var japanese = "あおい"
alert("Romanjifyied! :  " + romanjify(japanese));
