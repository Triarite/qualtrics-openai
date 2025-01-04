// main.js
import { context, getChatCompletion } from './api.js';
import { sendMessage, fullDisable } from './chat.js';
import { getCookie, handleSubmission } from './verification.js';

let apiKey = null;
let conversation = [{ role: "system", content: context }, {role: "assistant", content: $("#greeting").text()}];



// Fetch API key
$.get("key.txt", function(key) {
    apiKey = key;
    console.log("API Key acquired");
}, 'text'); // Specifies data type as text


// On document ready...
$(document).ready(function () {
    if (getCookie("uid")) {
        userVerified();
    }

    // Handle click event on the button
    $('button[name="uid_submission_button"]').click(function(event) {
        event.preventDefault(); // Prevent default form submission
        var uid = $('#uid_input').val();
        if (handleSubmission(uid) == true) {
            document.cookie = `uid=${uid}`;
        };
    });

    // Handle Enter key press while the input is focused
    $('#uid_input').keypress(function(event) {
        if (event.which === 13) { // 13 is the Enter key
            event.preventDefault(); // Prevent default form submission
            var uid = $('#uid_input').val();
            if (handleSubmission(uid) == true) {
                document.cookie = `uid=${uid}`;
            };
        };
    });

    
    // Handle "Send" button click
    $("#send-button").click(() => sendMessage(conversation, apiKey));

    // Handle "Enter" key press in input field
    $("#message-field").keypress(function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(conversation, apiKey);
        }
    });

});
