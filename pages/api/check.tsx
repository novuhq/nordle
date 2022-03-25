import type { NextApiRequest, NextApiResponse } from "next";
import words from "an-array-of-english-words";
import { sign } from "jsonwebtoken";

let wordr: any = {};
for (const add of words) {
  wordr[add] = true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const word = process.env.WORDLE_WORD as string;
  const letters = (req.query.words as string) || "";
  const splitLetters = letters.split("");

  if (
    letters !== word &&
    !wordr[letters] &&
    process.env.WORDLE_DICTIONARY === "true"
  ) {
    res.json({
      value: splitLetters.map((l) => ({ letter: l, status: "" })),
      secret: "",
    });
    return;
  }

  const letterSend = splitLetters.map((l: string, index: number) => {
    const findIndex = word.indexOf(l);
    if (findIndex === index) {
      return { letter: l, status: "correct" };
    }
    if (findIndex > -1) {
      return { letter: l, status: "misplaced" };
    }
    return { letter: l, status: "used" };
  });

  res.json({
    value: letterSend,
    secret: letterSend.every((letter) => letter.status === "correct")
      ? sign({ date: new Date() }, process.env.WORDLE_KEY as string)
      : "",
  });
}
