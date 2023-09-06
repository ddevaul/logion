import styles from "./Header.module.css";
import Link from "next/link";
import { NavBar } from "./navigation/nav-bar";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = Record<string, never>; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const Header = ({ }: AppProps) => (

  <div className={styles.header}>
    <div className={styles.logo}>Logion Logo</div>
    <div className={styles.link}>
      <Link href="/"><u>Home</u></Link>
      <Link href="/analyze-psellos"><u>Analyze Psellos</u></Link>
      <NavBar/>
    </div>
  </div>
);

export default Header;
