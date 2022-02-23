const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// get quotes from API
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// show new quote
function newQuote() {
  showLoadingSpinner();
  // pick random quote
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  console.log(quote);
  // check if author field is blank
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else if (quote.author === 'Donald Trump') {
    authorText.textContent = 'Cheeto Criminal D-Bag';
  } else {
    authorText.textContent = quote.author;
  }
  // handle longer quotes
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // set quote and hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    getQuotes();
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
