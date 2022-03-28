import Confetti from "react-confetti";
import { FC, RefObject, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { DiscordLink } from "../../helpers/discord.link";

export const Congrats: FC<{ getRef: RefObject<any> }> = (props) => {
  const [total, setTotal] = useState(200);
  useEffect(() => {
    try {
      // @ts-ignore
      window.gtag("event", "sign_up", {
        method: "puzzle",
      });
    } catch (err) {}
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setTotal(0);
    }, 1002);
  }, []);
  return (
    <>
      <div style={{ position: "fixed", left: 0, top: 0, width: "100%" }}>
        <Confetti numberOfPieces={total} />
      </div>
      Congratulation! You have found the correct word.
      <br />
      Do you want us to send you some cool swag?
      <br />
      Just join our discord channel, Send us the correct answer, add in your
      <br />
      details and, and participate in our giveaway!
      <br />
      <br />
      Here is your valid answer key:
      <div style={{ display: "flex" }}>
        <div
          style={{
            background: "#252525",
            border: "1px solid #868686",
            padding: 10,
            maxWidth: "100%",
            width: 500,
            userSelect: "all",
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          ${localStorage.getItem("secret")}
        </div>
        <CopyToClipboard
          text={localStorage.getItem("secret")!}
          onCopy={() => toast("Copied to clipboard")}
        >
          <div
            style={{
              cursor: "pointer",
              background: "#252525",
              border: "1px solid #868686",
              marginLeft: 10,
              padding: 10,
            }}
          >
            <img src="/clipboard.png" style={{ maxWidth: 20 }} />
          </div>
        </CopyToClipboard>
      </div>
      <br />
      Go over to our Discord and join the channel:{" "}
      <strong style={{ textDecoration: "underline" }}>#new-name-reveal</strong>
      <br />
      And feel out the form
      <br />
      <DiscordLink />
    </>
  );
};
