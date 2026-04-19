import Head from "next/head";
import HomeComponent from "./components/HomeComponent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeComponent />
    </>
  );
}