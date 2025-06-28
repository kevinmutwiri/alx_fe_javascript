let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Business" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Inspiration" },
    { text: "The mind is everything. What you think you become.", category: "Philosophy" }
];

const quoteText = document.getElementById('quoteText');
const quoteCategory = document.getElementById('quoteCategory');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteFormDiv = document.getElementById('addQuoteForm');
const showAddQuoteFormBtn = document.getElementById('showAddQuoteFormBtn');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');

function showRandomQuote() {
    if (quotes.length === 0) {
        quoteText.textContent = "No quotes available.";
        quoteCategory.textContent = "";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteCategory.textContent = `Category: ${randomQuote.category}`;
}

function addQuote() {
    const text = newQuoteTextInput.value.trim();
    const category = newQuoteCategoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';
        showRandomQuote();
        addQuoteFormDiv.classList.add('hidden');
    } else {
        alert('Please enter both quote text and category.');
    }
}

function createAddQuoteForm() {
    addQuoteFormDiv.classList.remove('hidden');
    newQuoteTextInput.value = '';
    newQuoteCategoryInput.value = '';
    newQuoteTextInput.focus();
}

newQuoteBtn.addEventListener('click', () => {
    showRandomQuote();
});

showAddQuoteFormBtn.addEventListener('click', () => {
    if (addQuoteFormDiv.classList.contains('hidden')) {
        createAddQuoteForm();
    } else {
        addQuoteFormDiv.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    addQuoteFormDiv.classList.add('hidden');
});
