import type { AppProps } from "next/app";
import "../styles/globals.css";

import { Inter } from "@next/font/google";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "../layout/default";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>

      <NextNProgress />

      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        className="text-sm"
        toastClassName="font-sans"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
