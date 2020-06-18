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
const kYaml = `
---
  swagger: "2.0"
  info: 
    version: "1.0.0"
    title: "Swagger Petstore"
    description: "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification"
    termsOfService: "http://swagger.io/terms/"
    contact: 
      name: "Swagger API Team"
    license: 
      name: "MIT"
  host: "petstore.swagger.io"
  basePath: "/api"
  schemes: 
    - "http"
  consumes: 
    - "application/json"
  produces: 
    - "application/json"
  paths: 
    /pets: 
      get: 
        description: "Returns all pets from the system that the user has access to"
        operationId: "findPets"
        produces: 
          - "application/json"
          - "application/xml"
          - "text/xml"
          - "text/html"
        parameters: 
          - 
            name: "tags"
            in: "query"
            description: "tags to filter by"
            required: false
            type: "array"
            items: 
              type: "string"
            collectionFormat: "csv"
          - 
            name: "limit"
            in: "query"
            description: "maximum number of results to return"
            required: false
            type: "integer"
            format: "int32"
        responses: 
          "200":
            description: "pet response"
            schema: 
              type: "array"
              items: 
                $ref: "#/definitions/Pet"
          default: 
            description: "unexpected error"
            schema: 
              $ref: "#/definitions/ErrorModel"
      post: 
        description: "Creates a new pet in the store.  Duplicates are allowed"
        operationId: "addPet"
        produces: 
          - "application/json"
        parameters: 
          - 
            name: "pet"
            in: "body"
            description: "Pet to add to the store"
            required: true
            schema: 
              $ref: "#/definitions/NewPet"
        responses: 
          "200":
            description: "pet response"
            schema: 
              $ref: "#/definitions/Pet"
          default: 
            description: "unexpected error"
            schema: 
              $ref: "#/definitions/ErrorModel"
    /pets/{id}: 
      get: 
        description: "Returns a user based on a single ID, if the user does not have access to the pet"
        operationId: "findPetById"
        produces: 
          - "application/json"
          - "application/xml"
          - "text/xml"
          - "text/html"
        parameters: 
          - 
            name: "id"
            in: "path"
            description: "ID of pet to fetch"
            required: true
            type: "integer"
            format: "int64"
        responses: 
          "200":
            description: "pet response"
            schema: 
              $ref: "#/definitions/Pet"
          default: 
            description: "unexpected error"
            schema: 
              $ref: "#/definitions/ErrorModel"
      delete: 
        description: "deletes a single pet based on the ID supplied"
        operationId: "deletePet"
        parameters: 
          - 
            name: "id"
            in: "path"
            description: "ID of pet to delete"
            required: true
            type: "integer"
            format: "int64"
        responses: 
          "204":
            description: "pet deleted"
          default: 
            description: "unexpected error"
            schema: 
              $ref: "#/definitions/ErrorModel"
  definitions: 
    Pet: 
      type: "object"
      allOf: 
        - 
          $ref: "#/definitions/NewPet"
        - 
          required: 
            - "id"
          properties: 
            id: 
              type: "integer"
              format: "int64"
    NewPet: 
      type: "object"
      required: 
        - "name"
      properties: 
        name: 
          type: "string"
        tag: 
          type: "string"
    ErrorModel: 
      type: "object"
      required: 
        - "code"
        - "message"
      properties: 
        code: 
          type: "integer"
          format: "int32"
        message: 
          type: "string"
`;
const body = {
    "sourceFormat": "yaml",
    "targetFormat": "json",
    "content": kYaml,
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
    console.log(responseBodyJson)
    // console.log(JSON.parse(responseBodyJson.result))
    // console.log(JSON.parse(res.body))
    // yamlString = JSON.parse(res.body).result;
    // parser = require('js-yaml').safeLoad;
    // console.log(parser(yamlString))
})
.catch(err => console.error(err));

// console.log(handler)
