import styles from "./styles.module.css";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import { Keyboard } from "./keyboard";
import axios from "axios";
import { showModal } from "./modal";
import { HowToPlay } from "../modals/how.to.play";
import { Congrats } from "../modals/congrats";
import { Loser } from "../modals/loser";

type blockType = Array<Array<{ letter: string; status: string }>>;
let savedBlocked: blockType = [[]];

const Nordle: FC<{ wordLength: number }> = (props) => {
  const [_, setBlocks] = useState<false | blockType>(false);
  const [lock, setLock] = useState(false);
  const { wordLength } = props;

  useEffect(() => {
    const tries = window.localStorage.getItem("tries");
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
        component: (close) => <HowToPlay close={close} />,
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
      component: () => <Congrats />,
      minWidth: 1000,
    });
  }, []);

  const failed = useCallback(() => {
    showModal({
      title: "Ohh no",
      disabledClosing: true,
      component: () => <Loser />,
      minWidth: 1000,
    });
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

    const { data } = await axios.get(`/api/check?words=${letters}`);
    complete(data);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const checkForComplete = () => {
    if (savedBlocked.some((s) => s.every((p) => p.status === "correct"))) {
      setTimeout(() => {
        setLock(true);
        correct();
      }, 1100);
      return;
    }

    if (savedBlocked.every((s) => s.every((w) => w.status))) {
      setTimeout(() => {
        setLock(true);
        failed();
      }, 1100);
      return;
    }
  };

  const complete = useCallback((words: any[]) => {
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
              <div key={`a-${k2}`} data-status={col.status}>
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
