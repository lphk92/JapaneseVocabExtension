function csvToVocabList(csv, name)
{
    // Split the file into its various lines
    var lines = csv.trim().split("\n");
    if (lines.length == 0)
    {
        alert("An error ocurred: Empty/invalid .csv file");
        return;
    }

    // Process the first line, which should include the headings for the file
    // We require there to be 3, case-insensitive headings: Kanji, Reading, Meaning
    var headings = lines[0].split(",");

    var kanjiIndex = -1;
    var readingIndex = -1;
    var meaningIndex = -1;

    for (var i = 0 ; i < headings.length ; i++)
    {
        if (headings[i].toLowerCase() == "kanji")
        {
            kanjiIndex = i;
        }
        else if (headings[i].toLowerCase() == "reading")
        {
            readingIndex = i;
        }
        else if (headings[i].toLowerCase() == "meaning")
        {
            meaningIndex = i;
        }
    }

    if (kanjiIndex < 0 || readingIndex < 0 || meaningIndex < 0)
    {
        alert("An error ocurred: There must be at least the following headings within the CSV file - \"Kanji\", \"Reading\", and \"Meaning\"");
        return;
    }

    // Generate the list object
    var list = new Array();
    for (var i = 1 ; i < lines.length ; i++)
    {
        var parts = lines[i].split(",");
        var entry = {
            "index":i-1,
            "kanji":parts[kanjiIndex],
            "reading":parts[readingIndex],
            "meaning":parts[meaningIndex],
            "visible":true };
        list.push(entry);
    }

    return {"name": name, "list":list};
}
