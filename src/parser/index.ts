import PyWeekly from './pythonWeekly';
import * as cheerio from 'cheerio';

const Parsers = {
  "admin@pycoders.com": PyWeekly
}

export default function Parse(email: string, responseData: any) {
  var buff = new Buffer(responseData, "base64");
  var text = buff.toString();

  const $ = cheerio.load()
  Parsers[email] && Parsers[email]($);
}
