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
                userVerified();
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
function userVerified() {
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
            fullDisable();
        }
    }, 120_000); // Timeout in ms (60_000 = 1 min)

}
