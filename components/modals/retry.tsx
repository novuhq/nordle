import { FC } from "react";

export const Retry: FC<{
  close: () => void;
  clickToRetry: (close: () => void) => void;
}> = (props) => {
  return (
    <>
      Oops, looks like didn’t get it this time.
      <br />
      If you feel like you can do it the next, you get one more{" "}
      <strong>retry</strong>.<br />
      We hope you enjoyed the game, we send some swag every now and then so feel
      free to join our Discord and be part of the next swag giveaway.
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

      <button style={{background: 'black', marginTop: 10}} onClick={() => props.clickToRetry(props.close)}>Click Here</button>
    </>
  );
};
