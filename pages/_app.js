import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>OpenHouse Support</title>
        <meta name="description" content="OpenHouse Support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
