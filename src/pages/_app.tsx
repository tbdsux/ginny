import type { AppProps } from "next/app";
import "../styles/globals.css";

import { Inter } from "@next/font/google";
import DefaultLayout from "../layout/default";
import ProjectsProvider from "../modules/projects/context";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>

      <ProjectsProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ProjectsProvider>
    </>
  );
}
