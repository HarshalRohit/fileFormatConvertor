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


yaml2 = `
---
matrix:
    include:
        - os: osx
          sudo: required
          osx_image: xcode11.6
          language: node_js
          node_js: '10'
          env:
                - ELECTRON_CACHE=$HOME/.cache/electron
                - ELECTRON_BUILDER_CACHE=$HOME/.cache/electron-builder
                - TRAVIS_OS_NAME=macosx
                - GITHUB_TOKEN=hdfh774jtgi94lgf0873hurf643h9id9k48fy3h9df09fk984jkk
                - GH_TOKEN=hdfh774jtgi94lgf0873hurf643h9id9k48fy3h9df09fk984jkk
                - CI=false
compiler:
    - gcc
    - clang

cache:
    directories:
        - assets
        - node_modules
        - $HOME/.cache/electron
        - $HOME/.cache/electron-builder

script:
    - npm install
    - npm run build
    - npm run mac-release

before_cache:
    - rm -rf $HOME/.cache/electron-builder/

notifications:
  email:
    - lahiri.devs@gmail.com

branches:
    except:
        - "/^v\\d+\\.\\d+\\.\\d+$/"

`


const body = {
    "sourceFormat": "yaml",
    "targetFormat": "json",
    "content": yaml2,
}



const { handler } = require('../index')

const event = {
    'body': JSON.stringify(body)
}

const context = null;
// console.log(event)
let yamlString;
handler(event, context)
.then(res => {
    responseBodyJson = JSON.parse(res.body)
    console.log(JSON.parse(responseBodyJson.result))
    // console.log(JSON.parse(res.body))
    // yamlString = JSON.parse(res.body).result;
    // parser = require('js-yaml').safeLoad;
    // console.log(parser(yamlString))
})
.catch(err => console.error(err));

// console.log(handler)
