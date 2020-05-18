import PyWeekly from './pythonWeekly';

const Parsers = {
  "admin@pycoders.com": PyWeekly
}

export default function Parse(email: string, responseData: any) {
  // TODO: add exception handling
  //Parsers[email]();
  var buff = new Buffer(responseData, "base64");
  var text = buff.toString();
  console.log(text);
}
