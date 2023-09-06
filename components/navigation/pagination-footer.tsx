import React from "react";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  chunk: number;
  maxChunk: number;
  setChunk: (chunk: number) => void;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const PaginationFooter = ( props: AppProps) => {
  const next = (): void => {
    props.setChunk(props.chunk + 1);
  }

  const back = (): void => {
    props.setChunk(props.chunk - 1);
  }

  if ( props.chunk > 0 && props.chunk < props.maxChunk) {
    return (
      <div>
        <button onClick={() => back()}>Back</button>
        <button onClick={() => next()}>Next</button>
      </div>
    );
  } else if (props.chunk > 0) {
    return (
      <div>
        <button onClick={() => back()}>Back</button>
      </div>
    );
  }
  
  else if (props.chunk < props.maxChunk) {
    return (
      <div>
        <button onClick={() => next()}>Next</button>
      </div>
    );
  }
};


export default PaginationFooter;
