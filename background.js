"use strict";
var audio_data = "";
function logURL(requestDetails) {
    if (requestDetails.url.includes("data:audio/wav;base64")) {
        audio_data = requestDetails.url;
    }
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);


function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {captured_data: audio_data}
    ).then(response => {
      console.log("Content-script: " + response.response);
    }).catch(onError);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
});