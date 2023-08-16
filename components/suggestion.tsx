import styles from "./Suggestion.module.css";
import React from "react";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  phrase: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const Suggestion = ({ phrase }: AppProps) => {
  const [expand, setExpand] = React.useState<boolean>(false);

  const toggleExpand = () => {
    setExpand(!expand);
  }
  if (expand===true) 
  return (
    <div className={styles.outerButton} onClick={toggleExpand}>
      {/* <button onClick={toggleExpand}>See Less+</button> */}
      <div>{phrase}</div>
      <div>τὰ: 90%</div>
      <div>ζῷα: 5%</div>
      <div>ἐκ: 1%</div>
      <div>ταύτης: 0.2%</div>
      <div>ἐγγίγνεται: 0.1%</div>
    </div>
  )
  return (
    <div onClick={toggleExpand} className={styles.outerButton}>
      {/* <button onClick={toggleExpand}>See More+</button> */}
      <div>{phrase}</div>
    </div>
  )
};


export default Suggestion;
