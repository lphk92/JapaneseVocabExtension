function loadListNames()
{
    try
    {
        var listNames = getListNames();
        for (var i = 0 ; i < listNames.length ; i++)
        {
            var newItem = document.createElement("div");
            $(newItem).html(listNames[i]);
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

            $("#lists").append(newItem);
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
    $("#activate").html(currVal ? "Deactivate" : "Activate");
    $("#activate").addClass( currVal ? "off" : "on");
    $("#activate").removeClass( currVal ? "on" : "off");
}

$("#activate").click(function(){
    localStorage["active"] = !(localStorage["active"] == "true"); 
    updateActivateButton();
    updateIcon();
});

$("#options").click(function(){
    window.open("options.html");
});

updateActivateButton();
loadListNames();
