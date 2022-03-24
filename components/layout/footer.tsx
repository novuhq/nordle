import Link from "next/link";

export const Footer = () => {
  return <div style={{ lineHeight: 3, maxWidth: '100%', width: 500, margin: '0 auto', marginTop: 20, display: "flex" }}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div>
          <Link href="https://twitter.com/notifirehq">
          Twitter
          </Link>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <div>
          <Link href="https://github.com/notifirehq/notifire">
          Notifire Github
          </Link>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
        <div>
          <Link href="https://discord.gg/7EtJW3N2">
          Discord
          </Link>
        </div>
      </div>
  </div>;
};
