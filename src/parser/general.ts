// ----------------------------------
// general.ts
// ----------------------------------

// import the markdown parser
// @ts-ignore
import * as Turndown from "turndown";

const converter = new Turndown();

/**
 * Gerenalised parser for newsletters that don't have a dedicated one.
 * @type function
 * @param {string} $ - Thr weird html of the newsletter
 **/
export default function generalParser($: string) {
  let md = converter.turndown($);
  console.log(md);
};
