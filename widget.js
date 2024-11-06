// Chat AI Widget Toggle
function toggleChatWidget() {
    const widgetContainer = document.getElementById("ai-widget-container");
    widgetContainer.classList.toggle("collapsed");
}

// Send Chat Message Functionality
function sendChatMessage() {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();

    if (message) {
        displayMessage("User: " + message, "user-message");
        generateAIResponse(message);
        chatInput.value = "";
    }
}

// Handle Enter Key to Send Chat
function handleChatKeyPress(event) {
    if (event.key === "Enter") {
        sendChatMessage();
    }
}

// Display Chat Messages
function displayMessage(message, className) {
    const chatOutput = document.getElementById("chat-output");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.innerText = message;
    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Generate AI Response (Placeholder Function)
function generateAIResponse(userMessage) {
    const response = "Thank you for your question! How can I assist you further?";
    displayMessage("AI: " + response, "ai-message");
}
