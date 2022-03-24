import type { NextPage } from "next";
import { Layout } from "../components/layout/layout";
import dynamic from "next/dynamic";
const Nordle = dynamic(() => import("../components/main/nordle"));

const Home: NextPage<{ WORD_LENGTH: number }> = (props) => {
  return (
    <Layout title="Guess our new company name!" description="Wordle">
      <Nordle wordLength={props.WORD_LENGTH} />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: { WORD_LENGTH: process.env.WORDLE_WORD!.length, CORRECT_ANSWER: 'Tm92MA==' },
  };
}

export default Home;
