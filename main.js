"use strict";

console.log("%ci would like to obtain a sample plox is activated", "font-size: 2em; font-weight: bold; background-image: linear-gradient(to left, violet, indigo, blue, green, orange, red); -webkit-background-clip: text; color: transparent;")

//Random hash for filename
function dec2hex (dec) {
  return ('0' + dec.toString(16)).substr(-2)
}
function generate_id (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

browser.runtime.onMessage.addListener(request => {
    console.log(request.captured_data);
    if (request.captured_data !== "") {
        var a = document.createElement("a"); //Create <a>
        a.href = request.captured_data;
        a.download = generate_id() + ".wav"; //File name Here
        a.click();
    } else {
        alert("No audio data detected\nPlease click the ►SPEAK IT button first");
    }
  
  return Promise.resolve({response: "Ok, got it"});
});