import styles from "./styles.module.css";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import { Keyboard } from "./keyboard";
import axios from "axios";
import { showModal } from "./modal";
import { HowToPlay } from "../modals/how.to.play";
import { Congrats } from "../modals/congrats";
import { Loser } from "../modals/loser";
import { toast } from "react-toastify";
import { Retry } from "../modals/retry";

type blockType = Array<Array<{ letter: string; status: string }>>;
let savedBlocked: blockType = [[]];
let retryAmount = 0;

const Nordle: FC<{ wordLength: number; totalRetry: number }> = (props) => {
  const [_, setBlocks] = useState<false | blockType>(false);
  const [lock, setLock] = useState(false);
  const [ret, setRetryAmount] = useState(0);
  const { wordLength } = props;

  useEffect(() => {
    const tries = window.localStorage.getItem("tries");
    const retry = localStorage.getItem("retry");
    if (retry) {
      retryAmount = Number(retry);
      setRetryAmount(Number(retry));
    }

    savedBlocked = tries
      ? (JSON.parse(tries!) as blockType)
      : [...new Array(6)].map(() =>
          [...new Array(wordLength || 4)].map(() => ({
            letter: "",
            status: "",
          }))
        );
    setBlocks(savedBlocked);

    if (!tries) {
      showModal({
        title: "Guess our company name and win some swag!",
        component: (close) => (
          <HowToPlay close={close} wordLength={wordLength} />
        ),
      });
    } else {
      checkForComplete();
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const correct = useCallback(() => {
    showModal({
      title: "Congratulation",
      disabledClosing: true,
      component: (close, ref) => <Congrats getRef={ref} />,
    });
  }, []);

  const clickToRetry = useCallback((close: () => void) => {
    localStorage.removeItem('tries');
    const retry = localStorage.getItem("retry");
    setRetryAmount(retry ? Number(retry) + 1 : 1);
    retryAmount = Number(retry) + 1;
    localStorage.setItem("retry", String(Number(retry) + 1));
    setLock(false);
    savedBlocked = [...new Array(6)].map(() =>
      [...new Array(wordLength || 4)].map(() => ({
        letter: "",
        status: "",
      }))
    );
    setBlocks(savedBlocked);
    close();
  }, []);

  const failed = useCallback(() => {
    if (+retryAmount >= +props.totalRetry) {
      showModal({
        title: "Ohh no",
        disabledClosing: true,
        component: () => <Loser />,
      });
    } else {
      showModal({
        title: "Ohh no",
        disabledClosing: true,
        component: (close) => (
          <Retry close={close} clickToRetry={clickToRetry} />
        ),
        minWidth: 1000,
      });
    }
  }, []);

  const allowSend = useMemo(() => {
    const test = savedBlocked.findIndex((b) => b.every((a) => !a.letter));
    if (test === 0) {
      return false;
    }

    return savedBlocked[test === -1 ? savedBlocked.length - 1 : test - 1].every(
      (a) => a.letter && !a.status
    );
  }, [savedBlocked]);

  const send = useCallback(async () => {
    const group = savedBlocked
      .slice(0)
      .reverse()
      .find((f) => f.filter((f) => f.letter).length);
    if (!group || !group.every((f) => f.letter && !f.status)) {
      return false;
    }

    const letters = group.map((p) => p.letter).join("");

    setLoading(true);

    const { value: data, secret } = (await axios.get(`/api/check?words=${letters}`)).data;
    if (data.every((f: any) => !f.status)) {
      toast.info("Not a valid word");
      setLoading(false);
      return;
    }
    complete(data, secret);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const checkForComplete = () => {
    if (savedBlocked.some((s) => s.every((p) => p.status === "correct"))) {
      setTimeout(() => {
        setLock(true);
        correct();
      }, 1900);
      return;
    }

    if (savedBlocked.every((s) => s.every((w) => w.status))) {
      setTimeout(() => {
        setLock(true);
        failed();
      }, 1900);
      return;
    }
  };

  const complete = useCallback((words: any[], secret = '') => {
    const group = savedBlocked.findIndex((f) =>
      f.every((f) => f.letter && !f.status)
    );

    savedBlocked = savedBlocked.map((p, index) => {
      if (index === group) {
        return words;
      }

      return p;
    });

    setBlocks(savedBlocked);

    localStorage.setItem("tries", JSON.stringify(savedBlocked));
    if (secret) {
      localStorage.setItem('secret', secret);
    }

    checkForComplete();
  }, []);

  const onDelete = useCallback(() => {
    const findIndex = savedBlocked.findIndex(
      (b) => b.filter((f) => f.status).length < (wordLength || 4)
    );

    const findInnerIndex =
      savedBlocked[findIndex].every((f) => f.letter && !f.status) && !allowSend
        ? Number(wordLength || 4) - 1
        : savedBlocked[findIndex].findIndex((f) => !f.letter) - 1;

    savedBlocked = savedBlocked.map((b, index) => {
      if (index === findIndex) {
        return b.map((c, ine) => {
          if (ine === findInnerIndex) return { letter: "", status: "" };
          return c;
        });
      }
      return b;
    });

    setBlocks(savedBlocked);
  }, [savedBlocked]);

  const addLetter = useCallback(
    (letter: string) => {
      const findIndex = savedBlocked.findIndex(
        (b) => b.filter((f) => f.letter).length < (wordLength || 4)
      );

      if (findIndex === -1) {
        return;
      }
      const findInnerIndex = savedBlocked[findIndex].findIndex(
        (f) => !f.letter
      );
      savedBlocked = savedBlocked.map((b, index) => {
        if (index === findIndex) {
          return b.map((c, ine) => {
            if (ine === findInnerIndex) {
              return { letter, status: "" };
            }

            return c;
          });
        }

        return b;
      });

      setBlocks(savedBlocked);
    },
    [savedBlocked]
  );

  return (
    <div style={lock ? { pointerEvents: "none" } : {}}>
      <div className={styles.hint}>
        Hint:
        <ul>
          <li>! you</li>
          <li>u = you</li>
          <li>v = t</li>
        </ul>
      </div>
      <div className={styles.wrapper}>
        {savedBlocked.map((row, k) => (
          <div key={`a-${k}`}>
            {row.map((col, k2) => (
              <div
                style={{ animationDelay: (k2 || 0) * 100 + "ms" }}
                key={`a-${k2}`}
                data-status={col.status}
              >
                {col.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.color}>
        <Keyboard
          disabledAll={lock}
          onSend={send}
          allowSend={allowSend}
          onDelete={onDelete}
          isLoading={loading}
          onClick={addLetter}
          wordList={savedBlocked}
        />
      </div>
    </div>
  );
};

export default Nordle;
