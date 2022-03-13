import styles from "./styles.module.css";
import { Item } from "./item";
import { FC } from "react";
import { Blogs } from "../../interfaces/blogs";

const Page: FC<{ blogs: Blogs[] }> = (props) => {
  const { blogs } = props;
  return (
    <div className={styles.wrapper}>
      {blogs.map((blog) => (
        <Item key={blog.path} blog={blog} />
      ))}
    </div>
  );
};

export default Page;
