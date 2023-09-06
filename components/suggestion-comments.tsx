import React, { useState } from "react";
import { type SuggestionModel } from "models/suggestion-model";
import { useComment } from "~/pages/api/services/use-comments";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";


// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  suggestion: SuggestionModel,
  setFocusSuggestion: (s: SuggestionModel | null) => void;
  // suggestions: Array<SuggestionModel>;
  // setSuggestions: (suggestions: Array<SuggestionModel>) => void;
}; 

// Easiest way to declare a Function Component; return type is inferred.
const Comments = ( props: AppProps) => {
  const [newComment, setNewComment] = useState('');
  const [reloadComments, setReloadComments] = useState<boolean>(false);

  const updateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value)
  }

  const { comments } = useComment({

    url: `/api/data/comments_get`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      suggestion_id: props.suggestion.id,
      change: reloadComments,
    }
  }, reloadComments);



  const saveComment = async (): Promise<void> => {
    const config: AxiosRequestConfig = {
      url: `/api/data/comments_save`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        suggestion_id: props.suggestion.id,
        comment: newComment 
      }
    };
    await axios(config);
    setNewComment('');
  }


  if (comments?.length === 0) {
    return (
      <div>
          <button onClick={() => props.setFocusSuggestion(null)}>back</button>
          <div>No Comments To Display</div>
          <textarea value={newComment} placeholder="Type Comment Here" onChange={updateComment}></textarea>
          <button onClick={() => {
            void saveComment().then(() => setReloadComments(!reloadComments))
            
          }}>Submit Comment</button>
      </div>
    )
  }

  return (
    <div>
        <button onClick={() => props.setFocusSuggestion(null)}>back</button>
      <div>{props.suggestion.id}</div>
      <div>
      {comments && comments.map((c, i) => {
        return (
          <div key={i}>
            <div>{comments && c.body}</div>
            <div>{comments && c.commenter.email}</div>
          </div>
        )
      })}
      </div>
      <textarea value={newComment} placeholder="Type Comment Here" onChange={updateComment}></textarea>
          <button onClick={() => {
            void saveComment().then(() => setReloadComments(!reloadComments))
          }}>Submit Comment</button>

      {/* <div>{props.suggestions.map((s, i) => {
        return (
          <div key={i}>{s.suggested_text}</div>
        );
      })}
      </div>
      {/* <div>{props.suggestions[0]?.start_index}</div> */}
      {/* <button onClick={() => props.setSuggestions([])}>exit</button> */}
    </div>
  );
};


export default Comments;
