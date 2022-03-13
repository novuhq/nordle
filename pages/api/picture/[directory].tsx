import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import stream from "stream";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: any, res: any) {
  if (
    !fs.existsSync(
      path.resolve(process.cwd(), "blogs", req.query.directory, "image.png")
    )
  ) {
    res.send("");
    return;
  }
  const r = fs.createReadStream(
    path.resolve(process.cwd(), "blogs", req.query.directory, "image.png")
  ); // or any other way to get a readable stream
  const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
      if (err) {
        return res.sendStatus(400);
      }
    }
  );
  ps.pipe(res); // <---- this makes a trick with stream error handling
}
