import type { NextPage } from "next";
import { Layout } from "../components/layout/layout";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Nordle = dynamic(() => import("../components/main/nordle"));

const Home: NextPage<{ WORD_LENGTH: number, TOTAL_RETRY: number }> = (props) => {
  useEffect(() => {
    console.error('--[Look for the answer - View Source]--')
  }, []);
  return (
    <Layout title="Guess our new company name!" description="Wordle">
      <Nordle totalRetry={props.TOTAL_RETRY} wordLength={props.WORD_LENGTH} />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      TOTAL_RETRY: Number(typeof process.env.WORDLE_RETRIES === "undefined" ? 1 : +process.env.WORDLE_RETRIES),
      WORD_LENGTH: process.env.WORDLE_WORD!.length,
      CORRECT_ANSWER: "Tm92MA==",
    },
  };
}

export default Home;
