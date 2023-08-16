import styles from "./Header.module.css";
import Link from "next/link";

// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = Record<string, never>; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const Header = ({ }: AppProps) => (

  <div className={styles.header}>
    <div className={styles.logo}>Logion Logo</div>
    <div className={styles.link}>
      <Link href="/"><u>Home</u></Link>
      <Link href="/analyzed-texts"><u>Analyzed Texts</u></Link>
      <Link href="/new-text"><u>New Model</u></Link>
      <Link href="/models"><u>Download Pre-Trained Model</u></Link>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  </div>
);

export default Header;
