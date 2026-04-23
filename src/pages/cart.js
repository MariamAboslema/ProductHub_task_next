import Head from "next/head";
import CartComponent from "@/components/CartComponent";

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartComponent />
    </>
  );
}