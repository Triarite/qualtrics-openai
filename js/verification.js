// This handles everything related to verifying and screening users

import { getAPIKey } from "./api.js";
import { fullDisable, waitForInputToBeEnabled } from "./chat.js";
import { fetchAndAssignUID, sendConversationToPHP } from "./php.js";

let timeout_timer;

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
    //! Remove this if statement when ready for deployment
    if(given_uid == 2004) { // Uses "secret" passcode for testing purposes.
        userVerified(getRandomTimeout(120_000, 120_000));
        return true;
    };

    async function handleFetchUID() {
        try {
            const success = await fetchAndAssignUID(given_uid);
            if (success) {
                console.log('Fetch and assignment were successful.');
                userVerified(getRandomTimeout(120_000, 120_000));
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
    let isChatbotEnabled = true;

    // Removes full page cover
    $(".verification-cover").remove();

    // Focus message input field on page load
    $("#message-field").focus();

    timeout_timer = new timer(function() { // Sets timer per below code
        const inputElement = document.querySelector('#message-field');
    
            if (inputElement.disabled) {
                console.log("Message being received, waiting to disable...");
                waitForInputToBeEnabled(inputElement, () => {
                    console.log('Input is now enabled! Performing action...');
                    isChatbotEnabled = false;
                    timeout_timer.pause();
                    fullDisable();
                    deleteCookieUID();
                    sendConversationToPHP();
                  });
            } else {
                isChatbotEnabled = false;
                timeout_timer.pause();
                fullDisable();
                deleteCookieUID();
                sendConversationToPHP();
            }
    }, timeout);
    
    var t=setInterval(function() {
            let timer_value = (timeout_timer.getTimeLeft() / 1000).toFixed(0) // Timer value in sec
            let timer_value_min = Math.floor((timer_value / 60)).toFixed(0)
            let timer_value_sec = (timer_value % 60).toFixed(0)
    
            
            while (timer_value_min.length < 2) timer_value_min = "0" + timer_value_min;
            while (timer_value_sec.length < 2) timer_value_sec = "0" + timer_value_sec;
            let timer_string = `${timer_value_min}:${timer_value_sec}`
            $("#timertext").text(`Time Left: ${timer_string}`)
            console.log(timer_string)
        }, 1000)

}
    
    /*
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
    */


// Erases browser UID cookie to prevent re-use
function deleteCookieUID() {
    // Erases cookie by setting expiry to a past date
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}




// Timer Functionality Code
function timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.getStateRunning = function() {
        return running
    }

    this.start()
}


