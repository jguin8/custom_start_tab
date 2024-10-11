const NAME = "Josh";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "General",
        "subGroups": [
            {
                "groupName": "NetSuite",
                "items":[
                    {"name": "Great Star", "shortcutKey": "a", "url": "https://6145117.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    {"name": "Terra Rose", "shortcutKey": "s", "url": "https://6751627.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    {"name": "Everyone Designs", "shortcutKey": "d", "url": "https://7236299.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    {"name": "House of Outdoors", "shortcutKey": "f", "url": "https://7576050.app.netsuite.com/app/center/card.nl?sc=-29&whence="}
                ]
            },
            {
                "groupName": "Astronomer",
                "items":[
                    {"name": "Home", "shortcutKey": "z", "url": "https://cloud.astronomer.io/clj7oy01y00ni01nk0hxrs3vp/deployments"},
                    {"name": "Token", "shortcutKey": "x", "url": "cloud.astronomer.io/token"},
                    {"name": "Forum", "shortcutKey": "x", "url": "https://forum.astronomer.io/top?period=yearly"}
                ]
            }
        ]
    },
    {
        "groupName": "Systems",
        "subGroups": [
            {
                "groupName": "Switchboard",
                "items":[
                    {"name": "Deployment", "shortcutKey": "z", "url": "https://merchant-labs.astronomer.run/dm0mate0/home"},
                    {"name": "Local Instance", "shortcutKey": "z", "url": "http://localhost:8081/"},
                    {"name": "Cosmos", "shortcutKey": "x", "url": "https://portal.azure.com/#@terrarose.com/resource/subscriptions/6d4d748d-18c9-4126-a3b6-9c5cf87fb739/resourceGroups/Switchboard/providers/Microsoft.DocumentDb/databaseAccounts/nile-switchboard/overview"},
                    {"name": "Blob Storage", "shortcutKey": "c", "url": "https://portal.azure.com/#@terrarose.com/resource/subscriptions/6d4d748d-18c9-4126-a3b6-9c5cf87fb739/resourceGroups/Switchboard/providers/Microsoft.Storage/storageAccounts/switchboard/overview"},
                    {"name": "sFTP Storage", "shortcutKey": "c", "url": "https://portal.azure.com/#@terrarose.com/resource/subscriptions/6d4d748d-18c9-4126-a3b6-9c5cf87fb739/resourcegroups/Switchboard/providers/Microsoft.Storage/storageAccounts/switchboardsftp/overview"}, 
                    {"name": "True Commerce", "shortcutKey": "q", "url": "https://foundry.truecommerce.com/core/Default.html"},
                    {"name": "Infor", "shortcutKey": "e", "url": "https://mingle-portal.inforcloudsuite.com/X9K98RYL2D6P5AD4_PRD"}
                ]
            }
        ]
    },
    {
        "groupName": "Tools",
        "items":[
            {"name": "Fivetran", "shortcutKey": "z", "url": "https://fivetran.com/login"},
            {"name": "CRON", "shortcutKey": "x", "url": "https://crontab.guru/#0_0_*_*_3"},
            {"name": "Azure Portal", "shortcutKey": "c", "url": "https://portal.azure.com/#home"},
            {"name": "Sharepoint", "shortcutKey": "q", "url": "https://terrarose.sharepoint.com/_layouts/15/sharepoint.aspx"},
            {"name": "DataDog", "shortcutKey": "w", "url": "https://us3.datadoghq.com/account/login/id/2c82dc80-9e62-11ec-b63b-da7ad0900003"},
            {"name": "Code Beautify", "shortcutKey": "e", "url": "https://codebeautify.org/"},
        ]
    }
]


let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        if (curGroupData.items) {
            for (let j = 0; j < curGroupData.items.length; j++){
                let curItemData = curGroupData.items[j];
    
                let pContainer = document.createElement("p");
                group.appendChild(pContainer);
    
                let link = document.createElement("a");
                link.innerHTML = curItemData.name;
                link.setAttribute("href", curItemData.url);
                pContainer.appendChild(link);
    
                let shortcutDisplay = document.createElement("span");
                shortcutDisplay.innerHTML = curItemData.shortcutKey;
                shortcutDisplay.className = "shortcut";
                shortcutDisplay.style.animation = "none";
                pContainer.appendChild(shortcutDisplay);
    
                getUrl[curItemData.shortcutKey] = curItemData.url
            }
        } else if (curGroupData.subGroups) {
            for (let j = 0; j < curGroupData.subGroups.length; j++){
                let curSubGroupData = curGroupData.subGroups[j];
    
                let subGroup = document.createElement("div");
                subGroup.className = "subgroup";
                group.appendChild(subGroup);

                let header = document.createElement("h2");
                header.innerHTML = curSubGroupData.groupName;
                subGroup.appendChild(header);

                for (let j = 0; j < curSubGroupData.items.length; j++){
                    let curItemData = curSubGroupData.items[j];
        
                    let pContainer = document.createElement("p");
                    subGroup.appendChild(pContainer);
        
                    let link = document.createElement("a");
                    link.innerHTML = curItemData.name;
                    link.setAttribute("href", curItemData.url);
                    pContainer.appendChild(link);
        
                    let shortcutDisplay = document.createElement("span");
                    shortcutDisplay.innerHTML = curItemData.shortcutKey;
                    shortcutDisplay.className = "shortcut";
                    shortcutDisplay.style.animation = "none";
                    pContainer.appendChild(shortcutDisplay);
        
                    getUrl[curItemData.shortcutKey] = curItemData.url
                }
            }
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){

    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main()
