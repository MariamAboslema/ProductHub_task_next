import Head from "next/head";
import AboutComponent from "./components/AboutComponent";
export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <AboutComponent />
    </>
  );
}