import React from "react";
import { useText } from "../api/services/use-text";
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from "next/head";
import Header from "components/header";
import styles from "../../styles/text.module.css"
import { useState } from "react";
import type { SuggestionModel } from "models/suggestion-model";
import Suggestion from "components/suggestion";
import ViewSuggestionPanel from "components/view-suggestion-panel";
import { type WordIndex } from "models/word-index";
import MaskableWord from "components/maskable-word";
import MakeSuggestionPanel from "components/make-suggestion-panel";
// import { getAccessToken } from "@auth0/nextjs-auth0";
import { type AxiosResponse, type AxiosRequestConfig } from "axios";
import axios from "axios";
import PaginationFooter from "components/navigation/pagination-footer";


export default function SingleText() {
  const [generateSuggestion, setGenerateSuggestion] = useState<boolean>(true);
  const [maskedWords, setMaskedWords] = useState<Array<WordIndex>>([]);
  const [suggestions, setSuggestions] = useState<Array<SuggestionModel>>([]);
  const [chunk, setChunk] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id;

 
  const getSuggestion = async ():Promise<string | void> => {
    if (maskedWords.length === 0) {
      window.alert("Must Select Words");
      return;
    }
    setLoading(true);
    // const { accessToken } = await getAccessToken(req, res);
    const config: AxiosRequestConfig = {
      url: `/api/data/get_suggestion`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${accessToken}`
      },
      data: {
        words: maskedWords,
        text_id: id,
        chunk: chunk,
      }
    };
    const response: AxiosResponse<string> = await axios(config);
    const { data } = response;
    // console.log(data)
    setLoading(false);
    return data;
    // useSuggestion({
    //   url: `/api/data/get_suggestion`,
    //   method: "GET",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   // data: {
    //   //   id: router.query.id
    //   // }
    // });
  }


  const saveSuggestion = async (suggestion: string):Promise<string> => {
    const words = maskedWords.map(wordIndex =>  wordIndex.word);
    const start_index = maskedWords[0]?.index;
    const end_index = maskedWords[maskedWords.length - 1]?.index;

    const config: AxiosRequestConfig = {
      url: `/api/data/save_suggestion`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        words: words,
        text_id: id,
        start_index: start_index,
        end_index: end_index,
        chunk: chunk,
        suggestion: suggestion
      }
    };
    const response: AxiosResponse<string> = await axios(config);
    const { data } = response;
    window.alert('Suggestion Saved');
    setMaskedWords([]);
    setGenerateSuggestion(false);
    // console.log(data)
    return data;
  }

  const { text } = useText({

    url: `/api/data/text`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      id: router.query.id,
      chunk: chunk
    }
  });

  if (generateSuggestion) {
    return (
      <>
        <Head>Logion</Head>
        <Header/>
        <div className={styles.textWithSuggestionsPanelContainer}>
          <div>
            {/* <button onClick={}>get suggestion</button> */}
            <button onClick={() => {
              setGenerateSuggestion(false)
              setMaskedWords([])
            }}>View Already Made Suggestions</button>
            {text &&  
            <>
              <PaginationFooter chunk={chunk} maxChunk={text[0].chunks} setChunk={setChunk}></PaginationFooter>
              <div>{text && text[0].title}</div>
              <div className={styles.textContainer}>{text && text[0].body.trim().split(/[\s]+/).map((word, index) => {
                  return (
                    <div key={index} className={styles.wordDiv}>
                      <MaskableWord word={word} index={index} maskedWords={maskedWords} setMaskedWords={setMaskedWords}></MaskableWord>
                    </div>
                  );
              })}
              </div>
            </>
            }
          </div>
          {text && <MakeSuggestionPanel loading={loading} saveSuggestion={saveSuggestion} chunk={chunk} text_id={text[0].id} getSuggestion={getSuggestion} maskedWords={maskedWords} setMaskedWords={setMaskedWords} ></MakeSuggestionPanel>}
        </div>
    </>
    )
  }

  if (suggestions.length > 0) {
    return (
    <>
        <Head>Logion</Head>
        <Header/>
        <div className={styles.textWithSuggestionsPanelContainer}>
          <div>
            <button onClick={() => {
              setGenerateSuggestion(true)
              setMaskedWords([])
              }}>Ask Logion For Your Own Suggestion</button>
            {text &&  
            <>
              <PaginationFooter chunk={chunk} maxChunk={text[0].chunks} setChunk={setChunk}></PaginationFooter>
              <div>{text && text[0].title}</div>
              <div className={styles.textContainer}>{text && text[0].body.trim().split(/[\s]+/).map((word, index) => {
                  const suggestions : Array<SuggestionModel> = [];
                  text[1].forEach((suggestion: SuggestionModel )=> {
                    if (index <= suggestion.end_index && index >= suggestion.start_index) {
                      suggestions.push(suggestion)
                    }
                  })
                  if (suggestions.length > 0) return <Suggestion word={word} suggestions={suggestions} index={index} setSuggestions={setSuggestions}></Suggestion>
                  return <div className={styles.wordDiv} key={index}>{word.trim()}</div>;
              })}
              </div>
            </>
            }
          </div>
          <ViewSuggestionPanel suggestions={suggestions} setSuggestions={setSuggestions}></ViewSuggestionPanel>
        </div>
    </>
    )
  }

  return (
      <>
        <Head>Logion</Head>
        <Header/>
        <div className={styles.textAndTitleContainer}>
          <button onClick={() => {
          setGenerateSuggestion(true)
          setMaskedWords([])
          }}>Ask Logion For Your Own Suggestion</button>
          <div>{text && text[0].title}</div>
          <div className={styles.textContainer}>{text && text[0].body.trim().split(/[\s]+/).map((word, index) => {
              const suggestions : Array<SuggestionModel> = [];
              text[1].forEach((suggestion: SuggestionModel )=> {
                if (index <= suggestion.end_index && index >= suggestion.start_index) {
                  suggestions.push(suggestion)
                }
              })
              if (suggestions.length > 0) return <Suggestion word={word} suggestions={suggestions} index={index} setSuggestions={setSuggestions}></Suggestion>
              return <div className={styles.wordDiv} key={index}>{word.trim()}</div>;
          })}
          </div>
        </div>
      </>
  );
}

export const getServerSideProps = withPageAuthRequired();