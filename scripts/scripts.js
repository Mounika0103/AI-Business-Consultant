document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded!");
    showSuggestions();
});

// Voice recognition setup
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("User said: ", transcript);
        handleVoiceCommand(transcript);
    };
}

// Function to start the voice assistant
function startVoiceAssistant() {
    console.log("Voice Assistant Activated!");
    recognition.start();
}

// Function to handle voice commands
function handleVoiceCommand(transcript) {
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
}

// Use Text-to-Speech to respond to users
function speakResponse(response) {
    const speech = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(speech);
}

// Function to track user queries
function trackQuery(query) {
    let userQueries = JSON.parse(localStorage.getItem("userQueries")) || [];
    userQueries.push(query);
    localStorage.setItem("userQueries", JSON.stringify(userQueries));
}

// Function to show suggestions based on previous queries
function showSuggestions() {
    const userQueries = JSON.parse(localStorage.getItem("userQueries"));
    if (userQueries && userQueries.length > 0) {
        const suggestions = "Based on your previous questions, here are some recommendations...";
        speakResponse(suggestions);
        console.log(suggestions);
    }
}
