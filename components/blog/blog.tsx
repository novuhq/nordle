import { Layout } from "../layout/layout";
import ReactMarkdown from "react-markdown";
import { FC } from "react";
import { Blogs } from "../../interfaces/blogs";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

export const Blog: FC<{ blog: Blogs }> = (props) => {
  const { blog } = props;
  const router = useRouter();
  return (
    <Layout title={blog?.title || ""} description={blog?.shortDescription!} picture={`/api/picture/${router.query.blog}`}>
      <h2 className={styles.author}>Written by {blog?.author!}</h2>
      <div className={styles.wrapper}>
        <img src={`/api/picture/${router.query.blog}`} />
        <div className={styles.left}>
          <ReactMarkdown>{blog?.mdx!}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};
