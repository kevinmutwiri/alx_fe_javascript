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
const lastViewedQuoteDisplay = document.getElementById('lastViewedQuoteDisplay');

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

function saveLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
    updateLastViewedQuoteDisplay(quote);
}

function loadLastViewedQuote() {
    const storedLastViewed = sessionStorage.getItem('lastViewedQuote');
    if (storedLastViewed) {
        const lastQuote = JSON.parse(storedLastViewed);
        updateLastViewedQuoteDisplay(lastQuote);
    } else {
        lastViewedQuoteDisplay.textContent = 'Last Viewed: None';
    }
}

function updateLastViewedQuoteDisplay(quote) {
    if (quote) {
        lastViewedQuoteDisplay.textContent = `Last Viewed: "${quote.text}" (${quote.category})`;
    } else {
        lastViewedQuoteDisplay.textContent = 'Last Viewed: None';
    }
}

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
        saveLastViewedQuote(null);
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteCategoryElement.textContent = `- ${randomQuote.author ? randomQuote.author : 'Unknown'} (${randomQuote.category})`;
    saveLastViewedQuote(randomQuote);
}

function addQuote() {
    const newText = newQuoteTextInput.value.trim();
    const newCategory = newQuoteCategoryInput.value.trim();

    if (newText && newCategory) {
        quotes.push({ text: newText, category: newCategory, author: "User" });
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';
        saveQuotes();
        populateCategoryFilter();
        showRandomQuote();
    } else {
        alert('Please enter both quote text and category.');
    }
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategoryFilter();
                showRandomQuote();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format. Please ensure it\'s an array of quote objects with "text" and "category" properties.');
            }
        } catch (e) {
            alert('Error parsing JSON file: ' + e.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function createAddQuoteForm() {
    console.log("Add Quote Form elements are ready.");
}

function initializeQuoteGenerator() {
    loadQuotes();
    loadLastViewedQuote();

    newQuoteButton.addEventListener('click', showRandomQuote);
    categoryFilterSelect.addEventListener('change', showRandomQuote);

    populateCategoryFilter();
    showRandomQuote();
    createAddQuoteForm();
}

document.addEventListener('DOMContentLoaded', initializeQuoteGenerator);
