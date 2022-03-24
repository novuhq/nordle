import styles from './styles.module.css';
import { FC } from "react";

export const HowToPlay: FC<{close: () => void}> = (props) => {
  return (
    <div style={{display: 'flex', width: '100%'}}>
      <div style={{flex: 1}}>
        <div onClick={props.close} style={{cursor: 'pointer', width: '100%', height: '100%', position: 'fixed', left: 0, top: 0, zIndex: 10}} />
        Guess the company name in six tries.<br />
        Each guess must be a valid five-letter word. Hit the enter button to submit.<br />
        After each guess, the color of the tiles will change to show how close your guess was to the word.
        <div className={styles.wrapper}>
          <p><strong>Examples</strong></p>
          <div className="example">
            <div data-row>
              <div data-letter="w" style={{backgroundColor: '#538d4e'}} />
              <div data-letter="e" />
              <div data-letter="a" />
              <div data-letter="r" />
              <div data-letter="y" />
            </div>
            <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
          </div>
          <div className="example">
            <div data-row>
              <div data-letter="p" />
              <div data-letter="i" style={{backgroundColor: '#b59f3b'}} />
              <div data-letter="l" />
              <div data-letter="l" />
              <div data-letter="s" />
            </div>
            <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
          </div>
          <div className="example">
            <div data-row>
              <div data-letter="v" />
              <div data-letter="a" />
              <div data-letter="g" />
              <div data-letter="u" style={{backgroundColor: '#3a3a3c'}} />
              <div data-letter="e" />
            </div>
            <p>The letter <strong>U</strong> is not in the word in any spot.</p>
          </div>
        </div>
      </div>
      <div style={{marginLeft: 30, display: 'flex', flexDirection: 'column'}}>
        Win Awesome Prizes!
        <img style={{maxWidth: 400}} src="/img.png" />
      </div>
    </div>
  );
};
