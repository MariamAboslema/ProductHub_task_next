import Head from "next/head";
import ProductsComponent from "@/components/ProductsComponent";

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
  try {
    const res = await fetch("http://localhost:3000/api/products?limit=194");

    const data = await res.json();

    return {
      props: {
        products: data.success ? data.products : [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        products: [],
      },
      revalidate: 60,
    };
  }
}