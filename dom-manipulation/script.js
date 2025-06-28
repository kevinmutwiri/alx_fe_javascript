// Initial quotes data
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "leadership" },
    { text: "Your time is limited, don't waste it living someone else's life.", category: "life" },
    { text: "Stay hungry, stay foolish.", category: "motivation" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "perseverance" },
    { text: "The way to get started is to quit talking and begin doing.", category: "action" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "Spread love everywhere you go.", category: "kindness" }
];

// Current selected category (null means all categories)
let currentCategory = null;

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryButtonsContainer = document.getElementById('categoryButtons');

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    // Display initial quote
    showRandomQuote();

    // Set up event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // Generate category buttons
    updateCategoryButtons();
});

// Show a random quote
function showRandomQuote() {
    let filteredQuotes = currentCategory
        ? quotes.filter(quote => quote.category === currentCategory)
        : quotes;

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = `<p class="quote-text">No quotes found in this category.</p>`;
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `
    <p class="quote-text">"${randomQuote.text}"</p>
    <p class="quote-category">— ${randomQuote.category}</p>
  `;
}

// Add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim().toLowerCase();

    if (!text || !category) {
        alert('Please enter both a quote and a category');
        return;
    }

    // Add the new quote
    quotes.push({ text, category });

    // Clear the inputs
    textInput.value = '';
    categoryInput.value = '';

    // Update category buttons if this is a new category
    updateCategoryButtons();

    // Show a confirmation
    alert('Quote added successfully!');
}

// Add a new category
function addCategory() {
    const categoryInput = document.getElementById('newCategory');
    const category = categoryInput.value.trim().toLowerCase();

    if (!category) {
        alert('Please enter a category name');
        return;
    }

    // Update category buttons
    updateCategoryButtons();

    // Clear the input
    categoryInput.value = '';

    // Show a confirmation
    alert(`Category "${category}" added! Now you can add quotes to this category.`);
}

// Update the category buttons
function updateCategoryButtons() {
    // Get all unique categories
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];

    // Clear existing buttons
    categoryButtonsContainer.innerHTML = '';

    // Create new buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.add('category-btn');
        if (category === 'all' && currentCategory === null) {
            button.classList.add('active');
        } else if (category === currentCategory) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentCategory = category === 'all' ? null : category;
            showRandomQuote();

            // Update active state of buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });

        categoryButtonsContainer.appendChild(button);
    });
}