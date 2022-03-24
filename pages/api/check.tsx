import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const word = process.env.WORDLE_WORD as string;
  const letters = (req.query.words as string) || "";
  res.json(
    letters.split("").map((l: string, index: number) => {
      const findIndex = word.indexOf(l);
      if (findIndex === index) {
        return { letter: l, status: "correct" };
      }
      if (findIndex > -1) {
        return { letter: l, status: "misplaced" };
      }
      return { letter: l, status: "used" };
    })
  );
}
