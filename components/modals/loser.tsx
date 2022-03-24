export const Loser = () => {
  return (
    <>
      Oops, looks like didn’t get it this time.
      <br />
      We hope you enjoyed the game, we send some swag every now and then so
      <br />
      feel free to join our Discord and be part of the next swag giveaway.
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
