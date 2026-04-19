import Head from "next/head";
import ProductsComponent from "../components/ProductsComponent";

export default function Products({ products }) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsComponent products={products} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();

  return {
    props: {
      products: data.products,
    },
  };
}