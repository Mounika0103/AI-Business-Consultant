document.getElementById("faqForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    const response = await fetch("/api/add-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer })
    });

    const result = await response.json();
    alert(result.message);
});
