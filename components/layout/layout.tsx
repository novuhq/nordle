import { Header } from "./header";
import { Footer } from "./footer";
import { FC } from "react";
import styles from "./styles.module.css";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ModalList } from "../main/modal";

export const Layout: FC<{
  title: string;
  description: string;
  picture?: string;
}> = (props) => {
  const { children, title } = props;
  return (
    <div className={styles.wrapper}>
      <Header />
      <h1>{title}</h1>
      <ModalList />
      {children}
      <Footer />
    </div>
  );
};
