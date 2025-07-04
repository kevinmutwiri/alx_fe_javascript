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

let _serverData = [
    { text: "Server's wisdom: Learn continuously.", category: "Wisdom", author: "Server" },
    { text: "Server's advice: Embrace change.", category: "Motivation", author: "Server" }
];

const SYNC_INTERVAL_MS = 15000;
const SERVER_LATENCY_MS = 1000;

const quoteTextElement = document.getElementById('quoteText');
const quoteCategoryElement = document.getElementById('quoteCategory');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteTextInput = document.getElementById('newQuoteText');
const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
const categoryFilterSelect = document.getElementById('categoryFilter');
const lastViewedQuoteDisplay = document.getElementById('lastViewedQuoteDisplay');
const syncStatusElement = document.getElementById('syncStatus');
const notificationElement = document.getElementById('notification');
const syncButton = document.getElementById('syncButton');

function showNotification(message, type = 'success') {
    notificationElement.textContent = message;
    notificationElement.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => {
        notificationElement.textContent = '';
    }, 5000);
}

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

function populateCategories() {
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
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    let filteredQuotes = quotes;

    const quoteDisplayElement = document.getElementById('quoteDisplay');

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

async function addQuote() {
    const newText = newQuoteTextInput.value.trim();
    const newCategory = newQuoteCategoryInput.value.trim();

    if (newText && newCategory) {
        const newQuote = { text: newText, category: newCategory, author: "User" };
        quotes.push(newQuote);
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';
        saveQuotes();
        populateCategories();
        showRandomQuote();

        try {
            await _simulateServerPost(newQuote);
            showNotification('Quote added and synced to server!');
        } catch (error) {
            console.error("Failed to post quote to server:", error);
            showNotification('Quote added locally, but failed to sync to server.', 'error');
        }
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
                populateCategories();
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

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.map(post => ({
            text: post.title,
            category: `API - ${post.id % 5 === 0 ? 'Motivation' : 'Inspiration'}`,
            author: `API User ${post.userId}`
        }));
    } catch (error) {
        console.error("Error fetching from JSONPlaceholder:", error);
        return JSON.parse(JSON.stringify(_serverData));
    }
}

async function _simulateServerPost(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuote),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Simulated server POST response:", responseData);

        const existingIndex = _serverData.findIndex(q => q.text === newQuote.text && q.category === newQuote.category);
        if (existingIndex === -1) {
            _serverData.push(newQuote);
        } else {
            _serverData[existingIndex] = newQuote;
        }

        return responseData;
    } catch (error) {
        console.error("Error simulating server POST:", error);
        throw error;
    }
}

async function syncQuotesWithServer() {
    syncStatusElement.textContent = 'Syncing...';
    try {
        const serverQuotes = await fetchQuotesFromServer();
        const localQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');

        let mergedQuotes = JSON.parse(JSON.stringify(serverQuotes));

        let newLocalQuotesCount = 0;
        let serverPrecedenceCount = 0;

        localQuotes.forEach(localQuote => {
            const serverHasQuote = serverQuotes.some(serverQ =>
                serverQ.text === localQuote.text && serverQ.category === localQuote.category
            );
            if (!serverHasQuote) {
                mergedQuotes.push(localQuote);
                newLocalQuotesCount++;
            } else {
                const serverVersion = serverQuotes.find(serverQ =>
                    serverQ.text === localQuote.text && serverQ.category === localQuote.category
                );
                if (JSON.stringify(localQuote) !== JSON.stringify(serverVersion)) {
                    serverPrecedenceCount++;
                }
            }
        });

        quotes = mergedQuotes;
        saveQuotes();
        populateCategories();
        showRandomQuote();

        const now = new Date();
        syncStatusElement.textContent = `Last synced: ${now.toLocaleTimeString()}`;

        let notificationMessage = 'Quotes synced with server!';
        if (newLocalQuotesCount > 0) {
            notificationMessage += ` ${newLocalQuotesCount} local quote(s) pushed.`;
        }
        if (serverPrecedenceCount > 0) {
            notificationMessage += ` ${serverPrecedenceCount} local change(s) overwritten.`;
        }
        if (newLocalQuotesCount === 0 && serverPrecedenceCount === 0 && serverQuotes.length !== localQuotes.length) {
            notificationMessage += ` ${serverQuotes.length - localQuotes.length + newLocalQuotesCount} new quote(s) from server.`;
        }
        showNotification(notificationMessage);

    } catch (error) {
        console.error("Sync error:", error);
        syncStatusElement.textContent = `Last synced: Failed (${new Date().toLocaleTimeString()})`;
        showNotification('Sync failed. Check console for details.', 'error');
    }
}

function initializeQuoteGenerator() {
    loadQuotes();
    loadLastViewedQuote();

    populateCategories();

    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        categoryFilterSelect.value = lastSelectedCategory;
    }

    showRandomQuote();

    newQuoteButton.addEventListener('click', showRandomQuote);
    categoryFilterSelect.addEventListener('change', showRandomQuote);
    syncButton.addEventListener('click', syncQuotesWithServer);

    syncQuotesWithServer();

    setInterval(syncQuotesWithServer, SYNC_INTERVAL_MS);
}

document.addEventListener('DOMContentLoaded', initializeQuoteGenerator);