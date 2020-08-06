const oldRedditHostname = "old.reddit.com";
const oldRedditUrl = "https://".concat(oldRedditHostname);
chrome.webRequest.onBeforeRequest.addListener(
    checkUrl,
    {
        urls: [
            "*://www.reddit.com/*"
        ],
        types: [
	        "main_frame", 
	        "sub_frame", 
	        "stylesheet", 
	        "script", 
	        "image", 
	        "object", 
	        "xmlhttprequest", 
	        "other"
        ]
    },
    ["blocking"]
);

function checkUrl(details) {
    var url = new URL(details.url)
    if (url.hostname === oldRedditHostname) return;
	return {redirectUrl: oldRedditUrl + url.pathname + url.search + url.hash};
}