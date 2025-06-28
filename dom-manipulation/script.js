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


function showRandomQuote() {
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


newQuoteBtn.addEventListener('click', showRandomQuote);

document.addEventListener('DOMContentLoaded', showRandomQuote);
