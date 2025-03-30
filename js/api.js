// api.js

import { local_conversation } from "./chat.js";

// * Clean! * //

// This handles everything related to the OpenAI API

// Grabs API key from file
export function getAPIKey(callback) {
    $.get("/vision-video/secret/key.txt", function(key) {
        console.log("API Key acquired");
        callback(key);
    }, 'text'); // Specifies data type as text
}

export async function getChatCompletion(conversation, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: conversation, // Include full conversation history
            max_tokens: 200
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        local_conversation.push(`Error ${response.status}: ${errorData.error.message}`); // Push to 
        throw new Error(`Error ${response.status}: ${errorData.error.message}`);
    }

    const data = await response.json();

    let final_response = data.choices[0].message.content.trim()
    let sanitized_final_response = DOMPurify.sanitize(final_response)

    local_conversation.push(sanitized_final_response);
    window.localStorage.setItem("local-conversation", JSON.stringify(local_conversation));
    return sanitized_final_response;
}
