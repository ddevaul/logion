import React, { useState } from "react";
import { type WordIndex } from "models/word-index";
import styles from "../src/styles/text.module.css"
import { SyncLoader } from "react-spinners";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  maskedWords: Array<WordIndex>;
  setMaskedWords: (maskedWords: Array<WordIndex>) => void;
  getSuggestion: () => Promise<string>;
  saveSuggestion: (suggestion: string) => Promise<string>;
  loading: boolean;
}; 

// Easiest way to declare a Function Component; return type is inferred.
const MakeSuggestionPanel = ( props: AppProps) => {
  const [suggestion, setSuggestion] = useState<string>();

  const askForSuggestion = async() => {
    const s = await props.getSuggestion();
    setSuggestion(s);
  }

  if (props.loading) {
    return (
      <div>
        <div>
        {props.maskedWords.map((wi, i) => {
          return (
            <div className={styles.wordDiv} key={i}>{wi.word}</div>
          )
        })}
        </div>
        <div>
        Logion is thinking!
          <SyncLoader></SyncLoader>
        </div>
      </div>
    );
  }

  if (suggestion) {
    return (
      <div>
      <div>
      {props.maskedWords.map((wi, i) => {
        return (
          <div className={styles.wordDiv} key={i}>{wi.word}</div>
        )
      })}
      </div>
      <div>{suggestion}</div>
      {/* <textarea></textarea> */}
      <button onClick={() => props.saveSuggestion(suggestion)}>Submit Suggestion / and maybe a comment later on</button>
    </div>
    );
  }

  return (
    <div>
      <div>
      {props.maskedWords.map((wi, i) => {
        return (
          <div className={styles.wordDiv} key={i}>{wi.word}</div>
        )
      })}
      </div>
      <button onClick={() => askForSuggestion()}>Ask For Suggestion</button>
    </div>
  );
};


export default MakeSuggestionPanel;
