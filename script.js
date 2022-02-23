const quoteContainer = document.getElementById('quote-container');

// get quotes from API
let apiQuotes = [];

// show new quote
function newQuote() {
  // pick random quote
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  console.log(quote)
}

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // catch error 
  }
}

// on load
getQuotes();