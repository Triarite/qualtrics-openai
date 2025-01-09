// This handles everything related to verifying and screening users

import { getAPIKey } from "./api.js";
import { fullDisable, waitForInputToBeEnabled } from "./chat.js";
import { fetchAndAssignUID, sendConversationToPHP } from "./php.js";

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

function getRandomTimeout(min, max) {
        let randomTimeout = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(`Time Allotted: ${randomTimeout / 1000}`);
        return randomTimeout;
}

export function handleSubmission(given_uid) {
    //! Remove this block when done
    if(given_uid == 2004) { // Uses "secret" passcode for testing purposes.
        userVerified(getRandomTimeout(5_000, 12_000));
        return true;
    };

    async function handleFetchUID() {
        try {
            const success = await fetchAndAssignUID(given_uid);
            if (success) {
                console.log('Fetch and assignment were successful.');
                userVerified(getRandomTimeout(90_000, 120_000));
                return true;
            } else {
                console.log('Fetch and assignment failed.');
                return false;
            }
        } catch (error) {
            console.error('An error occurred during fetch:', error);
            return false;
        }
    }

    if(handleFetchUID()) {
        return true;
    } else {
        return false;
    }
}

// Handles everything that happens *after* the user has been successfully verified
export function userVerified(timeout) {
    console.log("User successfully verified. userVerified() called.")


    // Removes full page cover
    $(".full-page-cover").remove();

    // Focus message input field on page load
    $("#message-field").focus();

    
    setTimeout(function() {
        const inputElement = document.querySelector('#message-field');

        if (inputElement.disabled) {
            console.log("Message being received, waiting to disable...");
            waitForInputToBeEnabled(inputElement, () => {
                console.log('Input is now enabled! Performing action...');
                fullDisable();
                deleteCookieUID();
                sendConversationToPHP();
              });
        } else {
            fullDisable();
            deleteCookieUID();
            sendConversationToPHP();
        }
    }, timeout); // Timeout in ms (60_000 = 1 min)

}

// Erases browser UID cookie to prevent re-use
function deleteCookieUID() {
    // Erases cookie by setting expiry to a past date
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}