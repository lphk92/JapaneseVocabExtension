function updateIcon()
{
    var active = localStorage["active"] == "true";

    var iconPath = active ? "rsc/icon-active.png" : "rsc/icon.png";
    var iconTitle = active ? "Active" : "Inactive";
    iconTitle = "Japanese Vocab Quiz: " + iconTitle;

    chrome.browserAction.setIcon({path: iconPath});
    chrome.browserAction.setTitle({title: iconTitle});
};
