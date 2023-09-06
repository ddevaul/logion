import styles from "./Suggestion.module.css";
import React from "react";
import { type SuggestionModel } from "models/suggestion-model";
import Comments from "./suggestion-comments";
import { useState } from "react";


// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  suggestions: Array<SuggestionModel>;
  setSuggestions: (suggestions: Array<SuggestionModel>) => void;
}; 

// Easiest way to declare a Function Component; return type is inferred.
const ViewSuggestionPanel = ( props: AppProps) => {
  const [focusSuggestion, setFocusSuggestion] = useState<SuggestionModel>();

  if (focusSuggestion) {
    return (
      <Comments suggestion={focusSuggestion} setFocusSuggestion={setFocusSuggestion}></Comments>
    );
  }
  return (
    <div>
      <div>{props.suggestions.map((s, i) => {
        return (
          <div key={i}>
            <div>{s.submitter.email}</div>
            <div>Original Text: {s.original_text}</div>
            <div>{"Logion's Suggestions"}{s.suggested_text}</div>
            <button onClick={() => setFocusSuggestion(s)}>View Comments</button>
          </div>
        );
      })}
      </div>
      <button onClick={() => props.setSuggestions([])}>exit</button>
    </div>
  );
};


export default ViewSuggestionPanel;
