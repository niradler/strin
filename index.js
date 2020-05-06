#!/usr/bin/env node
const minimist = require("minimist");
const fs = require("fs");
let data = "";
const args = minimist(process.argv.slice(2));

try {
  const stdinBuffer = fs.readFileSync(0);
  data = stdinBuffer.toString();
} catch (error) {}

const getRegex = (term, regex) => new RegExp(term, regex);

(function main(args, data) {
  let output = data;
  let term = args.term || args.t;
  let value = "";
  if (args.value || args.v) value = args.value || args.v;
  const simple_regex = args.sr || "";
  if (simple_regex) term = getRegex(term, simple_regex);

  const [action] = args._;

  switch (action) {
    case "replace":
      output = output.replace(term, value);
      break;
    case "join":
      output = JSON.parse(output);
      output = output.join(term);
      break;
    case "split":
      output = output.split(term);
      output = JSON.stringify(output);
      break;

    default:
      console.error("action not found.");
      break;
  }
  if (args.debug) console.log({ args, data, action, term, value });
  console.log(output);
})(args, data);
