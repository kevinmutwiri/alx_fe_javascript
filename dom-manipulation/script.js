let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", category: "Motivation", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Inspiration", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "Inspiration", author: "Aristotle" },
    { text: "The best way to predict the future is to create it.", category: "Innovation", author: "Peter Drucker" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life", author: "John Lennon" },
    { text: "Get busy living or get busy dying.", category: "Life", author: "Stephen King" }
];

const quoteTextElement = document.getElementById('quoteText');
const quoteCategoryElement = document.getElementById('quoteCategory');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const categoryFilterSelect = document.getElementById('categoryFilter');

function populateCategoryFilter() {
    const categories = [...new Set(quotes.map(quote => quote.category.trim().toLowerCase()))];
    categoryFilterSelect.innerHTML = '<option value="all">All Categories</option>';
    categories.sort().forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryFilterSelect.appendChild(option);
    });
}

function showRandomQuote() {
    const selectedCategory = categoryFilterSelect.value;
    let filteredQuotes = quotes;

    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category.trim().toLowerCase() === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        quoteTextElement.textContent = "No quotes available for this category.";
        quoteCategoryElement.textContent = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteCategoryElement.textContent = `- ${randomQuote.author ? randomQuote.author : 'Unknown'} (${randomQuote.category})`;
}

function addQuote() {
    const newText = newQuoteTextInput.value.trim();
    const newCategory = newQuoteCategoryInput.value.trim();

    if (newText && newCategory) {
        quotes.push({ text: newText, category: newCategory, author: "User" });
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';
        populateCategoryFilter();
        showRandomQuote();
    } else {
        alert('Please enter both quote text and category.');
    }
}

function createAddQuoteForm() {
    console.log("Add Quote Form elements are ready.");
}

function initializeQuoteGenerator() {
    newQuoteButton.addEventListener('click', showRandomQuote);
    categoryFilterSelect.addEventListener('change', showRandomQuote);

    populateCategoryFilter();
    showRandomQuote();
    createAddQuoteForm();
}

document.addEventListener('DOMContentLoaded', initializeQuoteGenerator);
