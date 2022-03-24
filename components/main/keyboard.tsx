import styles from "./styles.module.css";
import { FC, useCallback, useEffect, useMemo } from "react";
import { all } from "mdast-util-to-hast";
const abc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let last = false;
let allowSend = false;
export const Keyboard: FC<{
  onClick: (letter: string) => void;
  onDelete: () => void;
  isLoading: boolean;
  onSend: () => void;
  disabledAll: boolean;
  allowSend: boolean;
  wordList: Array<Array<{ letter: string; status: string }>>;
}> = (props) => {
  useEffect(() => {
    last = props.isLoading;
  }, [props.isLoading]);
  useEffect(() => {
    allowSend = props.allowSend;
  }, [props.allowSend]);
  useEffect(() => {
    window.addEventListener("keyup", (evt) => {
      if (props.disabledAll) {
        return;
      }
      if (evt.key.toLowerCase() === "enter" && allowSend) {
        props.onSend();
      } else if (evt.key.toLowerCase() === "backspace") {
        props.onDelete();
      } else if (abc.indexOf(evt.key) > -1 && !allowSend) {
        props.onClick(evt.key);
      }
    });
  }, []);
  const calculateMap = useMemo(() => {
    return abc.reduce((all, current) => {
      switch (true) {
        case props.wordList.some((s) =>
          s.some((p) => p.letter === current && p.status === "correct")
        ):
          all[current] = "correct";
          return all;
        case props.wordList.some((s) =>
          s.some((p) => p.letter === current && p.status === "misplaced")
        ):
          all[current] = "misplaced";
          return all;
        case props.wordList.some((s) => s.some((p) => p.letter === current)):
          all[current] = "used";
          return all;
      }

      all[current] = "";
      return all;
    }, {} as { [key: string]: string });
  }, [props.wordList]);

  const letterClick = useCallback(
    (letter: string) => () => {
      if (props.isLoading || allowSend) {
        return;
      }

      return props.onClick(letter);
    },
    [props.isLoading]
  );

  return (
    <>
      <div id="keyboard" className={styles.keyboardButton}>
        <div data-row>
          <button onClick={letterClick("q")} data-status={calculateMap["q"]}>
            q
          </button>
          <button onClick={letterClick("w")} data-status={calculateMap["w"]}>
            w
          </button>
          <button onClick={letterClick("e")} data-status={calculateMap["e"]}>
            e
          </button>
          <button onClick={letterClick("r")} data-status={calculateMap["r"]}>
            r
          </button>
          <button onClick={letterClick("t")} data-status={calculateMap["t"]}>
            t
          </button>
          <button onClick={letterClick("y")} data-status={calculateMap["y"]}>
            y
          </button>
          <button onClick={letterClick("u")} data-status={calculateMap["u"]}>
            u
          </button>
          <button onClick={letterClick("i")} data-status={calculateMap["i"]}>
            i
          </button>
          <button onClick={letterClick("o")} data-status={calculateMap["o"]}>
            o
          </button>
          <button onClick={letterClick("p")} data-status={calculateMap["p"]}>
            p
          </button>
        </div>
        <div data-row>
          <div className="spacer half" />
          <button onClick={letterClick("a")} data-status={calculateMap["a"]}>
            a
          </button>
          <button onClick={letterClick("s")} data-status={calculateMap["s"]}>
            s
          </button>
          <button onClick={letterClick("d")} data-status={calculateMap["d"]}>
            d
          </button>
          <button onClick={letterClick("f")} data-status={calculateMap["f"]}>
            f
          </button>
          <button onClick={letterClick("g")} data-status={calculateMap["g"]}>
            g
          </button>
          <button onClick={letterClick("h")} data-status={calculateMap["h"]}>
            h
          </button>
          <button onClick={letterClick("j")} data-status={calculateMap["j"]}>
            j
          </button>
          <button onClick={letterClick("k")} data-status={calculateMap["k"]}>
            k
          </button>
          <button onClick={letterClick("l")} data-status={calculateMap["l"]}>
            l
          </button>
          <div className="spacer half" />
        </div>
        <div data-row>
          <button
            disabled={!props.allowSend}
            onClick={props.onSend}
            data-key="↵"
            className="one-and-a-half"
          >
            enter
          </button>
          <button onClick={letterClick("z")} data-status={calculateMap["z"]}>
            z
          </button>
          <button onClick={letterClick("x")} data-status={calculateMap["x"]}>
            x
          </button>
          <button onClick={letterClick("c")} data-status={calculateMap["c"]}>
            c
          </button>
          <button onClick={letterClick("v")} data-status={calculateMap["v"]}>
            v
          </button>
          <button onClick={letterClick("b")} data-status={calculateMap["b"]}>
            b
          </button>
          <button onClick={letterClick("n")} data-status={calculateMap["n"]}>
            n
          </button>
          <button onClick={letterClick("m")} data-status={calculateMap["m"]}>
            m
          </button>
          <button onClick={props.onDelete}>DEL</button>
        </div>
      </div>
    </>
  );
};
