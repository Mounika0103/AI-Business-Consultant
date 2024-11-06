// Voice recognition setup
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
}

function startVoiceAssistant() {
    console.log("Voice Assistant Activated!");
    recognition.start();
}

// Recognize and respond to user voice input
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("User said: ", transcript);

    // Track the query for personalization
    trackQuery(transcript);

    // Check for common navigation phrases
    if (transcript.includes("services")) {
        speakResponse("Navigating to the Services page.");
        window.location.href = "services.html";
    } else if (transcript.includes("contact")) {
        speakResponse("Taking you to the Contact page.");
        window.location.href = "contact.html";
    } else if (transcript.includes("about")) {
        speakResponse("Here is the About Us page.");
        window.location.href = "about.html";
    } else {
        speakResponse("I'm not sure where you want to go. Try asking about the Home, Services, Contact, or About sections.");
    }
};

// Use Text-to-Speech to respond to users
function speakResponse(response) {
    const speech = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(speech);
}

// Toggle voice assistant on/off
let voiceEnabled = false;
function toggleVoiceAssistant() {
    voiceEnabled = !voiceEnabled;
    const message = voiceEnabled ? "Voice Assistant Enabled" : "Voice Assistant Disabled";
    speakResponse(message);
}

// Track user queries for personalization
function trackQuery(query) {
    let userQueries = JSON.parse(localStorage.getItem("userQueries")) || [];
    userQueries.push(query);
    localStorage.setItem("userQueries", JSON.stringify(userQueries));
}

// Show personalized suggestions based on previous queries
function showSuggestions() {
    const userQueries = JSON.parse(localStorage.getItem("userQueries"));
    if (userQueries && userQueries.length > 0) {
        const suggestions = "Based on your previous questions, here are some recommendations...";
        speakResponse(suggestions);
        console.log(suggestions);
    }
}
