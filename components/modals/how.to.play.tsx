import styles from "./styles.module.css";
import { FC } from "react";

const numbers = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "none",
  10: "ten",
};

export const HowToPlay: FC<{ close: () => void; wordLength: number }> = (
  props
) => {
  return (
    <div style={{ display: "flex", width: "100%", flexWrap: 'wrap' }}>
      <div style={{ flex: 1 }}>
        <div
          onClick={props.close}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 10,
          }}
        />
        Hey! We are Notifire an open-source notification infrastructure,
        <br />
        We are very excited to announce we are changing our company name,
        <br />
        and we would love to invite you to guess our new (in a Wordle-like game)
        and win some sweeeeet swag.
        <br />
        Guess the company name in six tries.
        <br />
        Each guess is{" "}
        {numbers[props.wordLength as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10]}
        -letters, use the hints on the screen, and your amazing developer{"'"}s
        skills. <br />
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
        <div className={styles.wrapper}>
          <p>
            <strong>Examples</strong>
          </p>
          <div className="example">
            <div data-row>
              <div data-letter="w" style={{ backgroundColor: "#538d4e" }} />
              <div data-letter="e" />
              <div data-letter="a" />
              <div data-letter="r" />
            </div>
            <p>
              The letter <strong>W</strong> is in the word and in the correct
              spot.
            </p>
          </div>
          <div className="example">
            <div data-row>
              <div data-letter="g" />
              <div data-letter="i" style={{ backgroundColor: "#b59f3b" }} />
              <div data-letter="f" />
              <div data-letter="t" />
            </div>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong
              spot.
            </p>
          </div>
          <div className="example">
            <div data-row>
              <div data-letter="m" />
              <div data-letter="a" />
              <div data-letter="k" />
              <div data-letter="e" style={{ backgroundColor: "#3a3a3c" }} />
            </div>
            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 30, display: "flex", flexDirection: "column" }}>
        Win Awesome Prizes!
        <img style={{ maxWidth: 400, borderRadius: 10 }} src="/img.png" />
      </div>
    </div>
  );
};
