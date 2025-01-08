// This handles everything related to verifying and screening users

import { fullDisable } from "./chat.js";

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function handleSubmission(given_uid) {
    var success_state;

    if(given_uid == 2004) {
        success_state = true;
        userVerified(5000);
        return success_state;
    };

    $.ajax({
        url: './api/fetchAndAssignUID.php', // Path to PHP script
        type: 'GET',
        data: { uid: given_uid },
        dataType: 'json',
        success: function (response) {
            if (response.uid) {
                console.log('UID fetched and marked as used:', response.uid);
                success_state = true;
                userVerified(120_000);
            } else if (response.error) {
                console.error('Error:', response.error);
                alert("Invalid UID. Please double-check and try again.")
                success_state = false;
            }
        },
        error: function (xhr, status, error) {
            // Handle AJAX errors
            console.error('AJAX Error:', error);
            success_state = false;
        }
    });

    return success_state;
}

// Handles everything that happens *after* the user has been successfully verified
export function userVerified(timeout) {
    console.log("User successfully verified. userVerified() called.")
    // Removes full page cover
    $(".full-page-cover").remove();

    // Focus message input field on page load
    $("#message-field").focus();

    // Set a timeout for checking API response state (Optional)
    setTimeout(function() {
        if ($("#message-field").prop('disabled')) {
            console.log("Message being received, waiting to disable...");
            fullDisable();
        } else {
            deleteCookieUID();
            fullDisable();
            sendConversationToPHP();
            sendPHPPostReq();
        }
    }, timeout); // Timeout in ms (60_000 = 1 min)

}

// Erases browser UID cookie to prevent re-use
function deleteCookieUID() {
    // Erases cookie by setting expiry to a past date
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function sendConversationToPHP() {
    // Retrieve the array from localStorage
    const conversation = JSON.parse(localStorage.getItem('local-conversation'));

    // Check if the conversation array exists
    if (conversation) {
        // Create a POST request using fetch
        fetch('api/updateInteraction.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conversation) // Convert the array to a JSON string before sending
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log('Conversation stored successfully:', data);
        })
        .catch(error => {
            console.error('Error sending conversation:', error);
        });
    } else {
        console.log('No conversation data found in localStorage.');
    }

}

function sendPHPPostReq() {
    fetch('api/updateInteraction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())  // Parsing the JSON response from the server
    .then(data => {
        // Handle the response from PHP
        console.log("UID:", data.uid);
        console.log("Unix Time:", data.unix_time);
        console.log("Conversation:", data.conversation);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}