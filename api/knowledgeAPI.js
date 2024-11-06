const express = require("express");
const router = express.Router();
const knowledgeBase = require("../backend/knowledgeBase.json");

// Search the knowledge base for answers to user queries
router.post("/ask", (req, res) => {
    const query = req.body.query.toLowerCase();
    const answer = knowledgeBase.find(faq => query.includes(faq.question.toLowerCase()));
    if (answer) {
        res.json({ response: answer.answer });
    } else {
        res.json({ response: "I'm not sure. Please ask a different question or contact support." });
    }
});

router.post("/add-faq", (req, res) => {
    const { question, answer } = req.body;
    knowledgeBase.push({ question, answer });
    // Code to save knowledgeBase data back to the JSON file or database here
    res.json({ message: "FAQ added successfully!" });
});

module.exports = router;
