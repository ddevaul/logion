import Head from "next/head";
import Header from "../../components/header"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <>
      <Head>
        <title>Logion</title>
        <meta name="description" content="Generated by create-t3-app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <Header></Header>
        <div className="flex" style={{"margin": "10px"}}>
            Logion is a project based out of Princeton University.
        </div>
      </main>
    </>
  );
}

