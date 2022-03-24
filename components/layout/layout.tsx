import { Header } from "./header";
import { Footer } from "./footer";
import { FC } from "react";
import styles from "./styles.module.css";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ModalList } from "../main/modal";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const Layout: FC<{
  title: string;
  description: string;
  picture?: string;
}> = (props) => {
  const { children, title } = props;
  return (
    <div className={styles.wrapper}>
      <Header title={title} />
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
