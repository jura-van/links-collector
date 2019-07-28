// https://stackoverflow.com/questions/13777887/call-background-function-of-chrome-extension-from-a-site
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        alert('something received: ' + request);
        if (request.message === "links_collector_stored_selection_loaded") {

        }
    }
);

// todo move to diff file
var linksStructure = {
    "AI links": [
        "Society",
        "Health",
        "Algorithms",
        "Robots",
        "Cars",
        "Hardware",
        "Brains"
    ],
    "Health links": [
        "Daily",
        "Aging",
        "Antiaging",
        "Brain",
        "Other"
    ]
};

document.addEventListener("DOMContentLoaded", function () {

    // https://stackoverflow.com/questions/14245334/chrome-extension-sendmessage-from-background-to-content-script-doesnt-work

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];

        console.log(tab.id);

        // todo problem here:
        // chrome.tabs.sendMessage(tab.id, {method: "links_collector_load_stored_selection"}, function handler(response) {
    //         // if (response.counter < 1000) {
    //             console.log(response);
    //             // chrome.tabs.sendMessage(tab.id, {counter: response.counter}, handler);
    //         // } else {
    //         //     alert("resultsRequestc");
    //         // }
    //     });
    });

    // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    //     var currTab = tabs[0];
    //     var tab_id = currTab.id;
    //
    //     alert(tab_id);
    //
    //     chrome.runtime.sendMessage({method: "links_collector_load_stored_selection"}, function (response) {
    //
    //         // todo cgeck error?
    //             alert('response ' + response);
    //
    //         alert('error ' + chrome.runtime.lastError.message);
    //
    //         // todo load first item if null
    //
    //         // todo enable selectors
    //
    //         // todo disable selector in html
    //     });
    // });

    var categorySelector = document.getElementById("categorySelector");

    for (var property in linksStructure) {
        if (linksStructure.hasOwnProperty(property)) {
            var opt = document.createElement("option");
            opt.appendChild(document.createTextNode(property));
            opt.value = property;
            categorySelector.appendChild(opt);
        }
    }

    categorySelector.onchange = categorySelected;

    var firstCategoryToRender = null;
    for (var property in linksStructure) {
        if (linksStructure.hasOwnProperty(property)) {
            firstCategoryToRender = property;
            break;
        }
    }

    renderSubcategories(firstCategoryToRender);

    var subCategorySelector = document.getElementById("subCategorySelector");
    subCategorySelector.onchange = subCategorySelected;
});

function categorySelected() {

    var subCategorySelector = document.getElementById("subCategorySelector");

    for (var i = subCategorySelector.options.length - 1; i >= 0; i--) {
        subCategorySelector.remove(i);
    }

    renderSubcategories(this.options[this.selectedIndex].value);

    var categorySelector = document.getElementById("categorySelector");

    storeSelectedCombination(categorySelector, subCategorySelector);
}

function renderSubcategories(selectedCategory) {

    var subCategorySelector = document.getElementById("subCategorySelector");

    for (var i = 0; i < linksStructure[selectedCategory].length; i++) {
        var value = linksStructure[selectedCategory][i];
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(value));
        opt.value = value;
        subCategorySelector.appendChild(opt);
    }
}

function storeSelectedCombination(categorySelector, subCategorySelector) {
    chrome.extension.sendMessage({
        method: "links_collector_category_changed", data: {
            category: categorySelector.options[categorySelector.selectedIndex].value
            ,
            subcategory: subCategorySelector.options[subCategorySelector.selectedIndex].value
        }
    });
}

function subCategorySelected() {

    var subCategorySelector = document.getElementById("subCategorySelector");
    var categorySelector = document.getElementById("categorySelector");

    storeSelectedCombination(categorySelector, subCategorySelector);
}

function addLink() {
    alert(1);
}

function generateHtml() {

}

function cleanLocalStorage() {

}