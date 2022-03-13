import { Layout } from "../layout/layout";
import ReactMarkdown from "react-markdown";
import { FC } from "react";
import { Blogs } from "../../interfaces/blogs";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import "github-markdown-css/github-markdown-dark.css";
import rehypeRaw from "rehype-raw";

export const Blog: FC<{ blog: Blogs }> = (props) => {
  const { blog } = props;
  const router = useRouter();
  return (
    <Layout
      title={blog?.title || ""}
      description={blog?.shortDescription!}
      picture={`/api/picture/${router.query.blog}`}
    >
      <h2 className={styles.author}>
        Written by{" "}
        <a href={blog?.authorGit!}>
          {blog?.author!}
        </a>
      </h2>
      <div className={styles.wrapper}>
        <img src={`/blogs/${router.query.blog}/image.png`} className={styles.img} />
        <div className={`${styles.left} markdown-body`}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {blog?.mdx!}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};
