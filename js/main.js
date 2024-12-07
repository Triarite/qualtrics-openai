// main.js
import { fetchClientIp, context } from './api.js';
import { sendMessage, fullDisable } from './chat.js';
import { checkUID } from './uid.js';

let apiKey = null;
let conversation = [{ role: "system", content: context }, {role: "assistant", content: $("#greeting").text()}];

// Fetch API key and client IP address
$.get("key.txt", function(key) {
    apiKey = key;
    console.log("API Key acquired");
}, 'text'); // Specifies data type as text

fetchClientIp();

// Document ready function
$(document).ready(function () {

    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    openFullscreen(); // Requests fullscreen on all browsers

    // Focus message input field on page load
    $("#message-field").focus();

    // Handle "Send" button click
    $("#send-button").click(() => sendMessage(conversation, apiKey));

    // Handle "Enter" key press in input field
    $("#message-field").keypress(function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(conversation, apiKey);
        }
    });

    // Set a timeout for checking API response state (Optional)
    setTimeout(function() {
        if ($("#message-field").prop('disabled')) {
            console.log("Message being received, waiting to disable...");
            fullDisable();
        } else {
            fullDisable();
        }
    }, 120_000); // Timeout in ms (60_000 = 1 min)
});
