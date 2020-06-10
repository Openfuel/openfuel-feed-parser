// ----------------------------------
// general.ts
// ----------------------------------

// import the markdown parser
import * as showdown from "showdown";

// create a converter instance
const converter = new showdown.Converter();

/**
 * Gerenalised parser for newsletters that don't have a dedicated one.
 * @type function
 * @param {string} $ - Thr weird html of the newsletter
 **/
export default function generalParser($: string) {
  let basicHTML = converter.makeHTML(converter.makeMd($))
};
