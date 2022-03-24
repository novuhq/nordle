import styles from "./styles.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="https://notifire.co">
          <img src="https://uploads-ssl.webflow.com/6130b4d29bb0ab09e14ae9ee/6130baca67f7af59b71fce42_SideLogo%20-%20White-p-500.png" />
        </Link>
      </div>
    </div>
  );
};
