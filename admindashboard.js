// Function to add FAQ
function addFAQ() {
    const question = document.getElementById('faq-question').value;
    const answer = document.getElementById('faq-answer').value;

    if (question && answer) {
        const faqList = document.getElementById('faq-list');
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `<strong>Q:</strong> ${question}<br><strong>A:</strong> ${answer}`;
        faqList.appendChild(faqItem);

        // Clear input fields
        document.getElementById('faq-question').value = '';
        document.getElementById('faq-answer').value = '';
    } else {
        alert('Please fill in both the question and answer.');
    }
}

// Function to add additional content
function addContent() {
    const title = document.getElementById('content-title').value;
    const content = document.getElementById('content-body').value;

    if (title && content) {
        const contentList = document.getElementById('content-list');
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.innerHTML = `<strong>${title}</strong><br>${content}`;
        contentList.appendChild(contentItem);

        // Clear input fields
        document.getElementById('content-title').value = '';
        document.getElementById('content-body').value = '';
    } else {
        alert('Please fill in both the title and content.');
    }
}

// Event listeners to handle button clicks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.manage-faqs button').addEventListener('click', addFAQ);
    document.querySelector('.integrate-content button').addEventListener('click', addContent);
});
