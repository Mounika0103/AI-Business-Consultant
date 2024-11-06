// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { transcribeAudio } = require('./speech_recognition'); // Assume you have this file
const { synthesizeText } = require('./text_to_speech'); // Assume you have this file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('assets')); // Serve static files

// Endpoint to process voice input
app.post('/process-input', async (req, res) => {
    const { question } = req.body;

    // Process the question using your business logic
    console.log('Received question:', question);

    // Generate a response (this could be from a model or hardcoded for testing)
    const responseText = `You asked: ${question}. Here's a response!`;

    // Generate TTS audio from the response text
    const audioFilePath = await synthesizeText(responseText);

    // Send back the audio file path or URL
    res.json({ audioFile: audioFilePath });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// @ts-ignore
const speechRecognition = require('./speech_recognition');

console.log(speechRecognition);  // This will log the entire speechRecognition object to the console

console.log(speechRecognition.startRecognition());

const textToSpeech = require('./text_to_speech');
