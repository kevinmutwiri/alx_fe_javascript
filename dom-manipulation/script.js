let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "work" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "innovation" },
    { text: "Strive not to be a success, but rather to be of value.", category: "motivation" },
    { text: "The mind is everything. What you think you become.", category: "mindset" },
    { text: "Life is what happens when you're busy making other plans.", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", category: "inspiration" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "leadership" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

let addQuoteFormDiv;
let showAddQuoteFormBtn;
let newQuoteTextInput;
let newQuoteCategoryInput;
let addQuoteSubmitBtn;

function showRandomQuote() {
    if (!quoteDisplay) {
        console.error("Error: 'quoteDisplay' element not found in the HTML. Cannot display quotes.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = '';

    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteTextElement.style.fontSize = '24px';
    quoteTextElement.style.fontWeight = 'bold';
    quoteTextElement.style.marginBottom = '10px';

    const quoteCategoryElement = document.createElement('p');
    const displayCategory = randomQuote.category.charAt(0).toUpperCase() + randomQuote.category.slice(1);
    quoteCategoryElement.textContent = `- ${displayCategory}`;
    quoteCategoryElement.style.fontSize = '18px';
    quoteCategoryElement.style.color = '#555';

    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
}

function addQuote() {
    if (!newQuoteTextInput || !newQuoteCategoryInput) {
        console.error("Error: Input fields for adding quotes are missing. Cannot add quote.");
        return;
    }

    const text = newQuoteTextInput.value.trim();
    const category = newQuoteCategoryInput.value.trim().toLowerCase();

    if (text && category) {
        quotes.push({ text, category });
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';

        if (addQuoteFormDiv) {
            addQuoteFormDiv.style.display = 'none';
        } else {
            console.warn("Warning: 'addQuoteFormDiv' not found. Cannot hide the form dynamically.");
        }

        showRandomQuote();
        console.log("Quote added:", { text, category });
    } else {
        console.log("Please enter both quote text and category.");
    }
}

function toggleAddQuoteForm() {
    if (!addQuoteFormDiv) {
        console.warn("Warning: 'addQuoteFormDiv' not found. Cannot toggle form visibility.");
        return;
    }
    if (addQuoteFormDiv.style.display === 'none' || addQuoteFormDiv.style.display === '') {
        addQuoteFormDiv.style.display = 'block';
    } else {
        addQuoteFormDiv.style.display = 'none';
    }
}

function setupAddQuoteForm() {
    showAddQuoteFormBtn = document.getElementById('showAddQuoteFormBtn');
    addQuoteFormDiv = document.getElementById('addQuoteForm');
    newQuoteTextInput = document.getElementById('newQuoteText');
    newQuoteCategoryInput = document.getElementById('newQuoteCategory');
    addQuoteSubmitBtn = document.querySelector('#addQuoteForm button') || document.getElementById('addQuoteSubmitBtn');

    if (!showAddQuoteFormBtn) {
        showAddQuoteFormBtn = document.createElement('button');
        showAddQuoteFormBtn.id = 'showAddQuoteFormBtn';
        showAddQuoteFormBtn.textContent = 'Add New Quote';
        showAddQuoteFormBtn.style.padding = '10px 20px';
        showAddQuoteFormBtn.style.backgroundColor = '#28a745';
        showAddQuoteFormBtn.style.color = 'white';
        showAddQuoteFormBtn.style.border = 'none';
        showAddQuoteFormBtn.style.borderRadius = '5px';
        showAddQuoteFormBtn.style.cursor = 'pointer';
        showAddQuoteFormBtn.style.marginLeft = '10px';
        
        if (newQuoteBtn) {
            newQuoteBtn.parentNode.insertBefore(showAddQuoteFormBtn, newQuoteBtn.nextSibling);
        } else {
            document.body.appendChild(showAddQuoteFormBtn);
        }
    }

    if (!addQuoteFormDiv) {
        addQuoteFormDiv = document.createElement('div');
        addQuoteFormDiv.id = 'addQuoteForm';
        addQuoteFormDiv.style.marginTop = '20px';
        addQuoteFormDiv.style.padding = '15px';
        addQuoteFormDiv.style.border = '1px solid #ccc';
        addQuoteFormDiv.style.borderRadius = '8px';
        addQuoteFormDiv.style.display = 'none';

        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Add Your Own Quote';
        formTitle.style.marginBottom = '10px';
        formTitle.style.fontSize = '20px';

        newQuoteTextInput = document.createElement('input');
        newQuoteTextInput.id = 'newQuoteText';
        newQuoteTextInput.type = 'text';
        newQuoteTextInput.placeholder = 'Enter a new quote';
        newQuoteTextInput.style.display = 'block';
        newQuoteTextInput.style.width = 'calc(100% - 20px)';
        newQuoteTextInput.style.padding = '8px';
        newQuoteTextInput.style.marginBottom = '10px';
        newQuoteTextInput.style.borderRadius = '4px';
        newQuoteTextInput.style.border = '1px solid #ddd';

        newQuoteCategoryInput = document.createElement('input');
        newQuoteCategoryInput.id = 'newQuoteCategory';
        newQuoteCategoryInput.type = 'text';
        newQuoteCategoryInput.placeholder = 'Enter quote category';
        newQuoteCategoryInput.style.display = 'block';
        newQuoteCategoryInput.style.width = 'calc(100% - 20px)';
        newQuoteCategoryInput.style.padding = '8px';
        newQuoteCategoryInput.style.marginBottom = '10px';
        newQuoteCategoryInput.style.borderRadius = '4px';
        newQuoteCategoryInput.style.border = '1px solid #ddd';

        addQuoteSubmitBtn = document.createElement('button');
        addQuoteSubmitBtn.id = 'addQuoteSubmitBtn';
        addQuoteSubmitBtn.textContent = 'Add Quote';
        addQuoteSubmitBtn.style.padding = '10px 15px';
        addQuoteSubmitBtn.style.backgroundColor = '#007bff';
        addQuoteSubmitBtn.style.color = 'white';
        addQuoteSubmitBtn.style.border = 'none';
        addQuoteSubmitBtn.style.borderRadius = '5px';
        addQuoteSubmitBtn.style.cursor = 'pointer';

        addQuoteFormDiv.appendChild(formTitle);
        addQuoteFormDiv.appendChild(newQuoteTextInput);
        addQuoteFormDiv.appendChild(newQuoteCategoryInput);
        addQuoteFormDiv.appendChild(addQuoteSubmitBtn);

        document.body.appendChild(addQuoteFormDiv);
    }

    if (showAddQuoteFormBtn) {
        showAddQuoteFormBtn.addEventListener('click', toggleAddQuoteForm);
    }
    if (addQuoteSubmitBtn) {
        addQuoteSubmitBtn.addEventListener('click', addQuote);
    }
}

if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', showRandomQuote);
} else {
    console.error("Error: 'newQuote' button not found in the HTML. The 'Show New Quote' functionality will not work.");
}

document.addEventListener('DOMContentLoaded', () => {
    setupAddQuoteForm();
    showRandomQuote();
});
