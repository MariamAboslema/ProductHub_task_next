import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import ("bootstrap/dist/js/bootstrap.min.js") 
   
  },[])

  if (Component.getLayout) {
  return Component.getLayout(<Component {...pageProps} />);
}
 
    return (
    <>
      <NavBar />
      <div className="container py-2">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
