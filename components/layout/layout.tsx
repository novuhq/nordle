import { Header } from "./header";
import { Footer } from "./footer";
import { FC } from "react";
import styles from "./styles.module.css";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export const Layout: FC<{
  title: string;
  description: string;
  picture?: string;
}> = (props) => {
  const router = useRouter();
  const { children, title, description, picture } = props;
  return (
    <div className={styles.wrapper}>
      <NextSeo
        title={"Novu - " + title}
        description={description}
        canonical={"https://blog.novu.co" + router.asPath}
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: picture
            ? [
                {
                  url: "https://blog.novu.co/api/picture/" + router.asPath,
                  width: 800,
                  height: 600,
                  alt: "Og Image Alt",
                  type: "image/jpeg",
                },
              ]
            : [],
          site_name: "Novu",
        }}
      />
      <Header />
      <h1>{title}</h1>
      {children}
      <Footer />
    </div>
  );
};
