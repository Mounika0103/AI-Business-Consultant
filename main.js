// main.js

let voiceEnabled = false;
let recognition; // Declare recognition outside to use it in stopListening

// Function to toggle voice interaction
function toggleVoiceInteraction() {
    voiceEnabled = !voiceEnabled;
    const toggleButton = document.getElementById('voiceToggle');

    if (voiceEnabled) {
        toggleButton.innerText = 'Disable Voice Interaction';
        console.log('Voice interaction enabled.');
        // Start listening for voice input
        startListening();
    } else {
        toggleButton.innerText = 'Enable Voice Interaction';
        console.log('Voice interaction disabled.');
        // Stop listening for voice input
        stopListening();
    }
}

// Function to start capturing audio input
function startListening() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log('Voice recognition started. Please speak...');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log('User said: ', transcript);
        // Send the transcript to the server for processing
        processVoiceInput(transcript);
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ', event.error);
    };

    recognition.onend = function() {
        console.log('Voice recognition ended.');
        // Restart listening if voice interaction is still enabled
        if (voiceEnabled) {
            startListening();
        }
    };

    recognition.start();
}

// Function to stop listening
function stopListening() {
    if (recognition) {
        recognition.stop();
    }
}

// Function to process the user's voice input
function processVoiceInput(transcript) {
    // Send the transcript to the server using fetch API
    fetch('/process-input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: transcript }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        if (data.audioFile) {
            playAudio(data.audioFile);
        }
    })
    .catch((error) => {
        console.error('Error processing voice input:', error);
    });
}

// Function to play the audio response
function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play()
    .then(() => {
        console.log('Playing audio response.');
    })
    .catch((error) => {
        console.error('Error playing audio:', error);
    });
}

// Attach event listener for the voice toggle button
document.getElementById('voiceToggle').addEventListener('click', toggleVoiceInteraction);

// JavaScript snippet for embedding the assistant
(function() {
    const container = document.getElementById('ai-assistant-container');
    const assistantDiv = document.createElement('div');
    assistantDiv.className = 'ai-assistant'; // Assign class for styling

    // Create assistant UI
    assistantDiv.innerHTML = `
        <div class="ai-header">
            <h3>AI Assistant</h3>
            <button id="toggle-btn">-</button> <!-- For expand/collapse -->
        </div>
        <div class="ai-body">
            <div class="messages" id="messages"></div>
            <input type="text" id="user-input" placeholder="Type your message..." />
            <button id="send-btn">Send</button>
        </div>
    `;

    container.appendChild(assistantDiv);

    // Add functionality for expand/collapse
    document.getElementById('toggle-btn').addEventListener('click', function() {
        const body = document.querySelector('.ai-body');
        if (body.style.display === 'none' || body.style.display === '') {
            body.style.display = 'flex';
            this.innerText = '-'; // Change button to collapse
        } else {
            body.style.display = 'none';
            this.innerText = '+'; // Change button to expand
        }
    });

    // Add event listener for send button
    document.getElementById('send-btn').addEventListener('click', function() {
        const inputField = document.getElementById('user-input');
        const message = inputField.value;
        // Handle sending message to your AI assistant logic here
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML += `<div>User: ${message}</div>`;
        
        // Here, you can add functionality to send the message to your backend for processing
        processVoiceInput(message); // Optionally send typed message for processing
        inputField.value = ''; // Clear input field
    });
})();

