// ----------------------------------
// general.ts
// ----------------------------------

// import the markdown parser
// @ts-ignore
import * as Turndown from "turndown";

// @ts-ignore
import * as mdJson from "md-2-json";

const converter = new Turndown();

/**
 * Gerenalised parser for newsletters that don't have a dedicated one.
 * @type function
 * @param {string} $ - Thr weird html of the newsletter
 **/
export default function generalParser($: string) {
  let md = converter.turndown($);
  console.log(mdJson.parse(md));
  console.log("=============")
};
