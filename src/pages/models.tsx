import Head from "next/head";
import Header from "../../components/header"
import Link from "next/link";

export default function NewText() {
  return (
    <>
      <Head>
        <title>Logion</title>
        <meta name="description" content="Generated by create-t3-app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Header></Header>
        <div style={{"margin": "10px"}}>
          <div>
            <u>Iliad</u>
          </div>
          <div>
            <u>Odyssey</u>
          </div>
          <div>
            <u>Batrachomyomachia</u>
          </div>
        </div>
      </main>
    </>
  );
}
