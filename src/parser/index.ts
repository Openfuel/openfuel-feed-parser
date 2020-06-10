// ----------------------------------
// index.ts
// ----------------------------------

/**
 * Parser for Newsletters
 **/

// The Python Weekly newsletter parser.
import PyWeekly from "./pythonWeekly";
import GeneralParser from "./general";

// The cheerio module for jquery-like element selctors
import * as cheerio from "cheerio";

// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

// collection of parser with their incoming email.
const Parsers = {
  "admin@pycoders.com": PyWeekly,
};

/**
 * Distributes cheerio instances to parsers.
 * @type function
 * @param {string} email - Email ID of the newsletter
 * @param {any} responseData - Base64 string of data containing HTML
 * @private false
 **/
export default function Parse(email: string, responseData: any, textData: any) {
  // create new Buffer from base64 string.
  var html = new Buffer(responseData, "base64").toString();
  var text = new Buffer(textData, "base64").toString();
  // create new cheerio instance.
  const $ = cheerio.load(html);
  // type check for obj key existence
  console.log(email)
  // handle over the cheerio instance to the particular newsletter parser.
  hasKey(Parsers, email) ?  Parsers[email]($) : GeneralParser(text);
}
