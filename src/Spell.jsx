import { useState } from "react";
const customDictionary = {
    teh: "the",
    wrok: "work",
    fot: "for",
    exampl: "example",
  };
  
   function SpellCheck() {
    const [text, setText] = useState("");
    const [suggestion, setSuggestion] = useState("");
  
    const handleChange = (e) => {
      const inputText = e.target.value;
      setText(inputText);
  
      // Split the text into words and find first incorrect spelling
      const words = inputText.split(" ");
      const incorrectWord = words.find((word) =>
        customDictionary.hasOwnProperty(word.toLowerCase())
      );
  
      if (incorrectWord) {
        setSuggestion(`Did you mean: ${customDictionary[incorrectWord.toLowerCase()]}?`);
      } else {
        setSuggestion("");
      }
    };
  
    return (
      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Spell Check and Auto-Correction</h1>
        <textarea
          rows="5"
          cols="50"
          value={text}
          onChange={handleChange}
          placeholder="Type here..."
          style={{
            fontSize: "1rem",
            padding: "10px",
            border: "2px solid black",
            width: "100%",
          }}
        />
        {suggestion && <p style={{ fontSize: "1.2rem" }}>{suggestion}</p>}
      </div>
    );
  }
  export default SpellCheck;