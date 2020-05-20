// ----------------------------------
// index.ts
// ----------------------------------

/**
* Parser for Python Weekly.
**/

import PyWeekly from "./pythonWeekly";
import * as cheerio from "cheerio";

// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj
}

const Parsers = {
  "admin@pycoders.com": PyWeekly,
};

export default function Parse(email: string, responseData: any) {
  var buff = new Buffer(responseData, "base64");
  var html = buff.toString();

  const $ = cheerio.load(html);
  if (hasKey(Parsers, email)) {
    Parsers[email]($);
  }
}
