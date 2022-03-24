import styles from "./styles.module.css";
import Link from "next/link";
import { FC } from "react";
import Github from "../svgs/github";

export const Header: FC<{title: string}> = (props) => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="https://notifire.co">
          <img src="https://uploads-ssl.webflow.com/6130b4d29bb0ab09e14ae9ee/6130baca67f7af59b71fce42_SideLogo%20-%20White-p-500.png" />
        </Link>
      </div>
      <div style={{fontSize: 14, paddingLeft: 20, textAlign: 'left'}}>
        Nordle
      </div>
      <div style={{cursor: 'pointer'}}>
        <Link href="https://github.com/notifirehq/nordle">
          <Github />
        </Link>
      </div>
    </div>
  );
};
