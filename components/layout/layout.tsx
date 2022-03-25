import { Header } from "./header";
import { Footer } from "./footer";
import { FC } from "react";
import styles from "./styles.module.css";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ModalList } from "../main/modal";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script'

export const Layout: FC<{
  title: string;
  description: string;
  picture?: string;
}> = (props) => {
  const { children, title } = props;
  return (
    <div className={styles.wrapper}>
      <Header title={title} />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3DKXTL0BXN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3DKXTL0BXN');
        `}
      </Script>
      <NextSeo
        title={"Notifire - Find our new company name"}
        description={"Wordle or should we say Nordle? (Hint)"}
      />
      <ModalList />
      {children}
      <Footer />
      <ToastContainer position="top-center" theme="dark" autoClose={1000} />
    </div>
  );
};
