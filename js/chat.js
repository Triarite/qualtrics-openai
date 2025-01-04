import { getChatCompletion } from "./api.js";

export function sendMessage(conversation, apiKey) {
    const userMessage = $("#message-field").val().trim();
    if (!userMessage) return; // Prevent sending empty messages

    // Clear input and display the user's message
    $("#message-field").val("");
    $(".chat-content").append(`<p><b>You: </b>${userMessage}</p>`);
    $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);
    $("#message-field").prop('disabled', true);

    // Add user message to conversation
    conversation.push({ role: "user", content: userMessage });

    // Fetch the assistant's response
    getChatCompletion(conversation, apiKey).then(completion => {
        $(".chat-content").append(`<p><b>Assistant: </b>${completion}</p>`);
        $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight);

        // Add assistant's response to conversation
        conversation.push({ role: "assistant", content: completion });
        $("#message-field").prop('disabled', false);
        $("#message-field").focus();
    }).catch(error => {
        $(".chat-content").append(`<p><b>Assistant Error: </b>Failed to fetch response. Please try again.</p>`);
        $("#message-field").prop('disabled', false);
        $("#message-field").focus();
        console.error(error);
    });
}

export function fullDisable() {
    $(".chat-window").remove();
    console.log("Time elapsed, disabling...");
    alert(`Thank you for chatting with the AI assistant. Please return to the original Qualtrics survey window.`)
  }
