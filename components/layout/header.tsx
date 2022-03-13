import styles from "./styles.module.css";
import Logo from "../svgs/logo";
import Github from "../svgs/github";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="https://notifire.co">
          <Logo />
        </Link>
      </div>
      <ul>
        <li data-item>
          <Link href="https://docs.notifire.co/docs/overview/introduction">
            Documentation
          </Link>
        </li>
        <li data-item>
          <Link href="/">Blog</Link>
        </li>
        {/*<li data-item>FAQ</li>*/}
        <li data-stars>
          <Link href="https://github.com/notifirehq/notifire">
            <div>
              <Github />
              <div>Stars On Github</div>
            </div>
          </Link>
        </li>
        {/*<li data-get-started>*/}
        {/*  <div>Get Started</div>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};
