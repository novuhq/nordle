export const DiscordLink = () => {
  return (
    <div
      style={{
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "underline",
      }}
      onClick={() => {
        try {
          try {
            // @ts-ignore
            window.gtag('event', 'login', {
              method: 'discord'
            });
          }
          catch (err) {}
        }
        catch (err) {

        }
        window.open("https://discord.gg/kDs9yJgb");
      }}
    >
      https://discord.gg/kDs9yJgb
    </div>
  );
};
