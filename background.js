// todo remove?
// chrome.browserAction.onClicked.addListener(function (tab) {
// });

// TODO TRY THIS:
// https://stackoverflow.com/questions/20435528/chrome-extension-send-response-does-not-work
// https://developer.chrome.com/apps/messaging

chrome.runtime.onMessage.addListener(

    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //         sendResponse({counter: request.counter+1});
    //     });

    function (request, sender, sendResponse) {

        alert(JSON.stringify(request));

        if (request.method === "links_collector_category_changed") {
            chrome.storage.sync.set({config: request.data});

        } else if (request.method === "links_collector_load_stored_selection") {

            // alert('loading');

            // chrome.storage.sync.get('config', function (obj) {

                // alert('sending' + JSON.stringify(obj.config));
                // return Promise.resolve(obj.config);

                // sendResponse(obj.config);
                sendResponse({msg: 'test'});

                // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                //     chrome.tabs.sendMessage(tabs[0].id, {
                //         action: "links_collector_stored_selection_loaded",
                //         config: obj.config
                //     }, function (response) {
                // });
                // });
            // });
        }
    });