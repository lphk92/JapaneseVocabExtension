function loadListNames()
{
    try
    {
        var listNames = getListNames();
        for (var i = 0 ; i < listNames.length ; i++)
        {
            var newItem = document.createElement("div");
            newItem.innerHTML = listNames[i];
            $(newItem).addClass("list-name");

            if (listNames[i] == currentListName())
            {
                $(newItem).addClass("selected");
            }

            // Add selection listener
            $(newItem).click(function(){
                var listName = this.innerHTML;
                $(".list-name").removeClass("selected");
                $(this).addClass("selected");
                setCurrentList(listName);
            });

            document.getElementById("lists").appendChild(newItem);
        }
    }
    catch(e)
    {
        alert("Error: " + e.message);
    }
}

function updateActivateButton()
{
    var currVal = localStorage["active"] == "true";
    document.getElementById("activate").innerHTML = currVal ? "Deactivate" : "Activate";
    $("#activate").addClass( currVal ? "off" : "on");
    $("#activate").removeClass( currVal ? "on" : "off");
}

$("#activate").click(function(){
    var currVal = localStorage["active"] == "true";
    localStorage["active"] = !currVal; 
    updateActivateButton();
});

$("#options").click(function(){
    window.open("options.html");
});

updateActivateButton();
loadListNames();
