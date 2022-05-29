import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/quote.scss";

const colors = ["#daf5ff", "#f5cdff", "#eeeebc", "#ffcccc", "#ddffdd"];

const quoteUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const Quote = () => {
  const getRandomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const [quote, setQuote] = useState({});
  const [color, setColor] = useState(colors[getRandomIndex(colors)]);
  const colorIndex = useRef(-1);

  const getQuote = useCallback(async () => {
    const response = await fetch(quoteUrl);
    const data = await response.json();
    const randomQuote = data.quotes[getRandomIndex(data.quotes)];
    setQuote(randomQuote);
    setColor(colors[colorIndex.current]);
    colorIndex.current = (colorIndex.current + 1) % colors.length;
  }, []);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  return (
    <div id="quote-box" style={{ backgroundColor: color }}>
      <p id="text">{quote.quote}</p>
      <p id="author">{quote.author}</p>
      <div className="btn-group">
        <button id="new-quote" onClick={getQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          rel="noreferrer"
          href={`https://twitter.com/intent/tweet?text=${quote.quote}`}
          target="_blank"
        >
          Tweet
        </a>
      </div>
    </div>
  );
};

export default Quote;
