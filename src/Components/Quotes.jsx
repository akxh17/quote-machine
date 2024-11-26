import React, { useState, useEffect } from "react";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaTumblrSquare } from "react-icons/fa";
import { PiQuotesFill } from "react-icons/pi";

function Quotes() {
  const [data, setData] = useState([]);
  const [quotes, setQuotes] = useState({
    quote: "Education costs money. But then so does ignorance.",
    author: "Sir Claus Moser",
  });
  const [bgcolor, setBgcolor] = useState({
    red: 255,
    green: 127,
    blue: 80,
  });
const test=Math.random()
console.log(test)
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  function qouteGenerator() {
    const newColor = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255),
    };

    setBgcolor(newColor);
    document.body.style.backgroundColor = `rgb(${newColor.red},${newColor.green},${newColor.blue})`;
    const randomIndex = Math.floor(Math.random() * data.length);
    const { quote, author } = data[randomIndex];
    setQuotes({
      quote: quote,
      author: author,
    });
  }

  function handleTwitterClick() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quotes.quote}" ${quotes.author} #quotes`
    )}`;
    window.open(twitterUrl, "_blank");
  }

  function handleTumblrClick() {
    const tumblrUrl = "https://www.tumblr.com/login";
    window.open(tumblrUrl, "_blank");
  }

  return (
    <div
      className="quote--container"
      style={{ color: `rgb(${bgcolor.red},${bgcolor.green},${bgcolor.blue})` }}
    >
      <PiQuotesFill size="3rem" />
      <p className="quote--text">{quotes.quote} </p>
      <p className="quote--author">-{quotes.author}</p>
      <div className="quote--button">
        <div>
          <FaSquareTwitter
            className="twitter--button"
            size="3rem"
            onClick={handleTwitterClick}
          />
          <FaTumblrSquare className="tumblr--button" size="3rem" onClick={handleTumblrClick} />
        </div>
        <button
          style={{
            backgroundColor: `rgb(${bgcolor.red},${bgcolor.green},${bgcolor.blue})`,
          }}
          className="quote-change-button"
          onClick={qouteGenerator}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Quotes;
