import Confetti from "react-confetti";
import { FC, RefObject, useEffect, useState } from "react";

export const Congrats: FC<{ getRef: RefObject<any> }> = (props) => {
  const [total, setTotal] = useState(200);
  useEffect(() => {
    setTimeout(() => {
      setTotal(0);
    }, 1000);
  }, []);
  return (
    <>
      <div style={{position: 'fixed', left: 0, top: 0, width: '100%'}}>
        <Confetti numberOfPieces={total} />
      </div>
      Congratulation! You have found the correct word.
      <br />
      Do you want us to send you some cool swag?
      <br />
      Just join our discord channel, Send us the correct answer, add in your
      details and, and participate in our giveaway!
      <br />
      <div
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
        onClick={() => window.open("https://discord.gg/kDs9yJgb")}
      >
        https://discord.gg/kDs9yJgb
      </div>
    </>
  );
};
