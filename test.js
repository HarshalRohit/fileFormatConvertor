// THIS FILE WAS CREATED AD-HOC 
// I HAVENT LEARNT TESTING LAMBDA FUNCTIONS (NOT EVEN TESTING FRAMEWORKS IN NODEJS IN GENERAL)
// BUT STILL THIS FILE PROVIDES A GOOD WAY TO TEST OUR HANDLER FUNCTION 
// WILL CLEANUP LATER AND WILL ALSO TRY TO INCORPORATE TESTING FRAMEWORK LATER :p


egYAMLString = `---
foo: bar
baz:
  - qux
  - quxx
corge: null
grault: 1
garply: true
waldo: "false"
fred: undefined
`;

egJSON = {
    "foo": "bar",
    "baz": [
      "qux",
      "quxx"
    ],
    "corge": null,
    "grault": 1,
    "garply": true,
    "waldo": "false",
    "fred": "undefined",
    "emptyarr": [],
    "emptyobj": {}
  }

const body = {
    "sourceFormat": "xml",
    "targetFormat": "yaml",
    "content": JSON.stringify(egYAMLString),
}



const { handler } = require('./index')

const event = {
    'body': JSON.stringify(body)
}

const context = null;
// console.log(event)
let yamlString;
handler(event, context)
.then(res => {
    console.log(JSON.parse(res.body))
    // yamlString = JSON.parse(res.body).result;
    // parser = require('js-yaml').safeLoad;
    // console.log(parser(yamlString))
})
.catch(err => console.error(err));

// console.log(handler)