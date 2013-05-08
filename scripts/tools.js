function updateIcon()
{
    var active = localStorage["active"] == "true";

    var iconPath = active ? "resources/icon-active.png" : "resources/icon.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;

    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
};
