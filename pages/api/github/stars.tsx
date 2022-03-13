import axios from "axios";
import {load} from 'cheerio';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: any, res: any) {
  const {data} = await axios.get('https://github.com/notifirehq/notifire');
  const $ = load(data);
  const total = $('#repo-stars-counter-star').text();
  res.json({total});
}