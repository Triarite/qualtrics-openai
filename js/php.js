// File for handling all JS bridging to PHP/SQL

// Returns a Promise that resolves to true or false depending on whether the fetch was successful
export function fetchAndAssignUID(given_uid) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './api/fetchAndAssignUID.php',
            type: 'GET',
            data: { uid: given_uid },
            dataType: 'json',
            success: function (response) {
                if (response.uid) {
                    console.log('UID fetched and marked as used:', response.uid);
                    resolve(true); // Resolve the promise with true
                } else if (response.error) {
                    console.error('Error:', response.error);
                    alert("Invalid UID. Please double-check and try again.");
                    resolve(false); // Resolve the promise with false
                }
            },
            error: function (xhr, status, error) {
                // Handle AJAX errors
                console.error('AJAX Error:', error);
                reject(false); // Reject the promise with false
            }
        });
    });
}

// Attempts to send the conversation array to PHP
export function sendConversationToPHP() {
    // Retrieve the array from localStorage
    let conversation = JSON.parse(localStorage.getItem('local-conversation'));

    // Check if the conversation array exists
    if (conversation) {
        // Create a POST request to updateInteraction
        fetch('api/updateInteraction.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conversation) // Convert the array to a JSON string before sending
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log('Conversation sent successfully client-side:', data);
            return true;
        })
        .catch(error => {
            console.error('Error sending conversation:', error);
            return false;
        });
    } else {
        console.log('No conversation data found in localStorage.');
        return false;
    }

}
