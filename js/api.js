// api.js

// This handles everything related to the OpenAI API

export const context = 
`
You are a customer service chatbot for VisionVideo which is a digital streaming service that
offers a variety of movies and TV shows. Prioritize brevity in your responses.

VisionVideo has been providing the highest quality and broadest selection of Movies and TV
shows to a wide audience for over 10 years.

There are 2 subscription plans. Both have recently been adjusted with price increases that may
have customers upset and inquiring about why we raised prices and what options customers
have if they want to change their subscription.

The customer you are talking to is always someone that has the Old Standard Plan and we are
moving them automatically to the New Standard Plan (unless they choose to cancel). You
should always try to upsell them to the New Platinum Plan.

`

export async function getChatCompletion(conversation, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: conversation, // Include full conversation history
            max_tokens: 200
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
