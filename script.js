const NAME = "Josh";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

const SHORTCUT_STARTER = 'tab';
const SHORTCUT_TIMEOUT = 1500;

const MASTER_MAP = [
    {
        "groupName": "General",
        "subGroups": [
            {
                "groupName": "ERP Systems",
                "items":[
                    {"name": "Terra Rose", "shortcutKey": "t", "url": "https://6751627.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    //{"name": "Everyone Designs", "shortcutKey": "e", "url": "https://7236299.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    //{"name": "House of Outdoors", "shortcutKey": "h", "url": "https://7576050.app.netsuite.com/app/center/card.nl?sc=-29&whence="},
                    {"name": "Great Star SAP", "shortcutKey": "h", "url": "https://my433127.s4hana.cloud.sap/ui"},
                    {"name": "Great Star NetSuite", "shortcutKey": "g", "url": "https://6145117.app.netsuite.com/app/center/card.nl?sc=-29&whence="}
                ]
            },
            {
                "groupName": "Tools",
                "items":[
                    {"name": "M365 Admin", "shortcutKey": "o", "url": "https://admin.microsoft.com/Adminportal/Home#/homepage"},
                    {"name": "Asana", "shortcutKey": "z", "url": "app.asana.com/-/login"},
                    {"name": "Bill/Divvy", "shortcutKey": "x", "url": "https://app.divvy.co/login"},
                    {"name": "Rippling", "shortcutKey": "x", "url": "https://app.rippling.com/login"},
                    
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
                    {"name": "Deployment", "shortcutKey": "b", "url": "https://merchant-labs.astronomer.run/dm0mate0/home"},
                ]
            },
            {
                "groupName": "Azure",
                "items":[
                    {"name": "Cosmos", "shortcutKey": "c", "url": "https://portal.azure.com/#@terrarose.com/resource/subscriptions/6d4d748d-18c9-4126-a3b6-9c5cf87fb739/resourceGroups/Switchboard/providers/Microsoft.DocumentDb/databaseAccounts/nile-switchboard/overview"},
                    {"name": "Blob Storage", "shortcutKey": "l", "url": "https://portal.azure.com/#@terrarose.com/resource/subscriptions/6d4d748d-18c9-4126-a3b6-9c5cf87fb739/resourceGroups/Switchboard/providers/Microsoft.Storage/storageAccounts/switchboard/overview"},
                ]
            },
            {
                "groupName": "Other",
                "items":[
                    {"name": "Power BI", "shortcutKey": "p", "url": "https://app.powerbi.com/home?tenant=7ef41f87-2d43-43b6-8d92-9e261334bc5d&experience=power-bi"},
                    {"name": "True Commerce", "shortcutKey": "q", "url": "https://foundry.truecommerce.com/core/Default.html"},
                    {"name": "Infor", "shortcutKey": "i", "url": "https://mingle-portal.inforcloudsuite.com/X9K98RYL2D6P5AD4_PRD"},
                ]
            }
        ]
    },
    {
        "groupName": "Tools",
        "items":[
            {"name": "Shopify", "shortcutKey": "s", "url": "https://www.shopify.com/partners"},
            {"name": "Fivetran", "shortcutKey": "f", "url": "https://fivetran.com/login"},
            {"name": "Azure Portal", "shortcutKey": "z", "url": "https://portal.azure.com/#home"},
            {"name": "Sharepoint", "shortcutKey": "q", "url": "https://terrarose.sharepoint.com/_layouts/15/sharepoint.aspx"},
            {"name": "Code Beautify", "shortcutKey": "u", "url": "https://codebeautify.org/"},
            {"name": "DSCO/Rithum", "shortcutKey": "r", "url": "https://account.commercehub.com/u/login/identifier"},
            {"name": "Retail Link/Supplier One", "shortcutKey": "l", "url": "https://retaillink.login.wal-mart.com/"},
            {"name": "Pulse", "shortcutKey": "l", "url": "https://pulse.lumatrak.com"},
            {"name": "Data Scorecard", "shortcutKey": "l", "url": "https://terrarose.sharepoint.com/:x:/r/sites/nile/_layouts/15/doc2.aspx?sourcedoc=%7B4BF550FB-F5BD-4744-B0C3-BDBD1036316E%7D&file=Data%20Scorecard.xlsx&action=default&mobileredirect=true"},
        ]
    }
];

let $container = document.getElementById("content");
let getUrl = {};
let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

/* ---------- GOOGLE SEARCH BAR (BELOW WELCOME SECTION) ---------- */
function setupSearchBar(){
    if (!$container) return;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.margin = "16px 0 24px";

    const form = document.createElement("form");
    form.action = "https://www.google.com/search";
    form.method = "GET";
    form.target = "_blank";
    form.autocomplete = "off";
    form.style.display = "flex";
    form.style.gap = "8px";
    form.style.width = "100%";
    form.style.maxWidth = "600px";

    const input = document.createElement("input");
    input.name = "q";
    input.type = "text";
    input.placeholder = "Search Google…";
    input.style.flex = "1";
    input.style.padding = "10px 12px";
    input.style.fontSize = "16px";

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Search";

    // Prevent shortcut hijacking while typing
    input.addEventListener("keydown", e => e.stopPropagation());
    input.addEventListener("keyup", e => e.stopPropagation());

    form.appendChild(input);
    form.appendChild(button);
    wrapper.appendChild(form);

    // 🔑 Insert BELOW welcome section, ABOVE shortcuts
    $container.parentNode.insertBefore(wrapper, $container);
}
/* -------------------------------------------------------------- */

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours / 6);
    if (curHours === 4) curHours = 3;
    document.getElementById("welcome-string").innerHTML =
        "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
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
            for (let item of curGroupData.items){
                let p = document.createElement("p");
                let a = document.createElement("a");
                a.href = item.url;
                a.innerHTML = item.name;

                let s = document.createElement("span");
                s.className = "shortcut";
                s.innerHTML = item.shortcutKey;

                p.appendChild(a);
                p.appendChild(s);
                group.appendChild(p);

                getUrl[item.shortcutKey] = item.url;
            }
        } else if (curGroupData.subGroups) {
            for (let sg of curGroupData.subGroups){
                let sub = document.createElement("div");
                sub.className = "subgroup";

                let h2 = document.createElement("h2");
                h2.innerHTML = sg.groupName;
                sub.appendChild(h2);

                for (let item of sg.items){
                    let p = document.createElement("p");
                    let a = document.createElement("a");
                    a.href = item.url;
                    a.innerHTML = item.name;

                    let s = document.createElement("span");
                    s.className = "shortcut";
                    s.innerHTML = item.shortcutKey;

                    p.appendChild(a);
                    p.appendChild(s);
                    sub.appendChild(p);

                    getUrl[item.shortcutKey] = item.url;
                }

                group.appendChild(sub);
            }
        }
    }
}

function shortcutListener(e){
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl[key]){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER){
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        for (let el of $shortcutDisplayList){
            el.style.animation = "none";
            setTimeout(() => el.style.animation = "", 10);
        }

        listenerTimeout = setTimeout(() => listeningForShortcut = false, SHORTCUT_TIMEOUT);
    }
}

function main(){
    setupWelcomeMessage();
    setupSearchBar();
    setupGroups();
    document.addEventListener("keyup", shortcutListener, false);
}

main();
