import styles from "./styles.module.css";
import Github from "../svgs/github";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const Header = () => {
  const [stars, setStars] = useState('0');
  useEffect(() => {
    loadStars();
  }, []);

  const loadStars = useCallback(async () => {
    const {data} = await axios.get('/api/github/stars');
    setStars(data.total);
  }, []);
  return (
    <div className={styles.header}>
      <div>
        <Link href="https://notifire.co">
          <img src="/logo.png" />
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
              <div>{stars} Stars On Github</div>
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
