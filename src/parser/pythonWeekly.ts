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
  TITLE_SPAN: "span a",

}

/**
* Selectors for parsing newsletter
* @type function
* @param {cheerio.Selector} $ - A cheerio instance
* @private false
**/
export default function parser($: any) {
  // TODO: Add parsing logic
  for (let i = 0; i < $(selectors.TITLE_SPAN).length; i++) {
  //  console.log($(selectors.TITLE_SPAN)[i].children[0].data);
  }
}
