import styles from "./styles.module.css";
import { FC } from "react";
import { Blogs } from "../../interfaces/blogs";
import Link from "next/link";

export const Item: FC<{ blog: Blogs }> = (props) => {
  const {
    blog: { title, shortDescription, image, path, author, authorGit },
  } = props;

  return (
    <Link href={`read/${path}`}>
      <div className={styles.item}>
        <div>
          <div className={styles.picture}>
            <img src={`/api/picture/${path}`} />
          </div>
          <h2>{title}</h2>
          <h3 onClick={e => {e.preventDefault(); e.stopPropagation(); window.open(authorGit)}}>
            <Link href={authorGit}>{author}</Link>
          </h3>
          <p>{shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};
