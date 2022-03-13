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
          url: "https://blog.novu.co" + router.asPath,
          title: "Novu - " + title,
          description: description,
          images: picture
            ? [
                {
                  url: "https://blog.novu.co/blogs/" + router.asPath + 'image.png',
                  width: 800,
                  height: 600,
                  alt:description,
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
