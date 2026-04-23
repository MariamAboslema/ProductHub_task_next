import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { getProductQuote } from '@/lib/productQuotes';
import { SessionProvider, useSession } from "next-auth/react";

function AppContent({ Component, pageProps }) {
  const { data: session } = useSession(); 
  useEffect(() => {
    if (!session) return; 

    const showMotivationalToast = () => {
      const quote = getProductQuote(null);
      toast(
        <div style={{ textAlign: 'center', lineHeight: '1.6' }}>
          <div style={{ fontSize: '1.35rem', marginBottom: '8px' }}>🛍️ ProductHub</div>
          <div style={{ fontSize: '1.02rem', opacity: 0.95 }}>{quote}</div>
        </div>,
        { duration: 6500, position: 'bottom-right' }
      );
    };

    showMotivationalToast();
    const interval = setInterval(showMotivationalToast, 2 * 60 * 1000);
    return () => clearInterval(interval);

  }, [session]); 

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
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 6500,
          style: {
            background: '#fff',
            color: '#4C8DAD',
            borderRadius: '16px',
            padding: '16px 22px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxWidth: '340px',
          },
        }}
      />
    </>
  );
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContent Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}