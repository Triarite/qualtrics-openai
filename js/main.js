// main.js
import { getAPIKey } from '/vision-video/js/api.js';
import { sendMessage, fullDisable } from '/vision-video/js/chat.js';
import { getCookie, handleSubmission, userVerified } from '/vision-video/js/verification.js';
import { formal, neutral, informal } from '/vision-video/js/contexts.js';
// const { convertArrayToCSV } = import('convert-array-to-csv');
// const converter = require('convert-array-to-csv');
let conversation = null;
let context = null;
let isSandboxMode = false;
let apiKey = null;
const url = (window.location.href).toLowerCase();

// Checks formalities to adjust context
formalityCheck(url)

getAPIKey(function(key) {
    apiKey = key;
});

// On document ready...
$(document).ready(function () {
    if (getCookie("uid")) {
        console.log(getCookie("uid"));
    }

    $('uid_input').focus();

    // Handle click event on the button
    $('button[name="uid_submission_button"]').click(function(event) {
        event.preventDefault(); // Prevent default form submission functionality
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
    $("#send-button").click(function(event) {
        event.preventDefault();
        sendMessage(conversation, apiKey);
    })
    // Handle "Enter" key press in input field
    $("#message-field").keypress(function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(conversation, apiKey);
        }
    });
});


// Blocks Inspect Element (superficially) to prevent bypassing screening alongside the oncontextmenu attr.
// in the main body tag
document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};


function formalityCheck(url) {
    if(url.includes("1nf")) { // Informal URL
        context = informal;
    } else if(url.includes("f0r")) { // Formal URL
        context = formal;
    } else if(url.includes("n3u")) { // Neutral URL
        context = neutral;
    } else if(url.includes("sandbox")) { // Sandbox mode
        isSandboxMode = true;
        $("#contextButton").click(function() {
            context = $("#context").val()
            conversation = [{ role: "developer", content: context }, {role: "assistant", content: $("#greeting").text()}];
            $("#context").remove()
            $("#contextButton").remove()
            });
    } else { // No formality code in URL... defaulting to neutral
        console.error("Warning: Formality code NOT found in URL. Defaulting to neutral...")
        context = neutral;
    }

    if (isSandboxMode == false) {
        conversation = [{ role: "developer", content: context }, {role: "assistant", content: $("#greeting").text()}];
    } else {
        conversation = [{ role: "developer", content: " " }, {role: "assistant", content: $("#greeting").text()}];
    }
}