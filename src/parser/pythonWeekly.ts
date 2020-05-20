// ----------------------------------
// pythonWeekly.ts
// ----------------------------------

/**
* Parser for the PythonWeekly newsletter.
**/

/**
* Selectors for parsing newsletter
* @type object
* @private true
**/
const selectors = {
  // the content div is the parent element for every article.
  // @selector: class
  CONTENT_DIV: ".mcnTextContent",

}

/**
* Selectors for parsing newsletter
* @type function
* @param {cheerio.Selector} $ - A cheerio instance
* @private false
**/
export default function parser($: any) {
  // TODO: Add parsing logic
  console.log($(selectors.CONTENT_DIV));
}
