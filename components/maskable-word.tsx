import styles from "./maskable-word.module.css";
import React from "react";
import { type WordIndex } from "models/word-index";
import { useState } from "react";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  word: string;
  index: number;
  maskedWords: Array<WordIndex>;
  setMaskedWords: (maskedWords: Array<WordIndex>) => void;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const MaskableWord = ( props: AppProps) => {
  const [masked, setMasked] = useState<boolean>(false);

  const maskWord = () => {
    console.log("mask this word ")
    const tempMaskedWord: WordIndex = {
      index: props.index,
      word: props.word
    }
    if (props.maskedWords.length === 0) {
      props.setMaskedWords([tempMaskedWord]);
      setMasked(true);
      return;
    }  
    const lastWord : WordIndex = props.maskedWords[props.maskedWords.length - 1];
    const firstWord : WordIndex = props.maskedWords[0];
    if (props.index === (lastWord.index + 1)) {
      const tempMaskedWords: Array<WordIndex> = props.maskedWords;
      tempMaskedWords.push(tempMaskedWord);
      props.setMaskedWords([...tempMaskedWords]);
      setMasked(true);
      return;
    }
    if (props.index === (firstWord.index - 1)) {
      const tempMaskedWords: Array<WordIndex> = props.maskedWords;
      tempMaskedWords.unshift(tempMaskedWord);
      props.setMaskedWords([...tempMaskedWords]);
      setMasked(true);
      return;
    }
    window.alert("Words For Suggestion Be Kept Consecutive");
  } 

  const unMaskWord = () => {
    const lastWord : WordIndex = props.maskedWords[props.maskedWords.length - 1];
    const firstWord : WordIndex = props.maskedWords[0];

    if (lastWord.index === props.index) {
      const tempMaskedWords = props.maskedWords;
      tempMaskedWords.pop();
      setMasked(false);
      props.setMaskedWords([...tempMaskedWords]);
      return;
    }
    if (firstWord.index === props.index) {
      const tempMaskedWords = props.maskedWords;
      tempMaskedWords.shift();
      setMasked(false);
      props.setMaskedWords([...tempMaskedWords])
    } 
    window.alert("Words For Suggestion Be Kept Consecutive");
  }

  if (masked) {
    return (
      <button className={styles.maskedWord} onClick={() => {unMaskWord()}}>{props.word}</button>
  );
  }
  return <button onClick={() => {maskWord()}}>{props.word}</button>
  
};


export default MaskableWord;
