// convertedJson = "{\"matrix\":{\"include\":[{\"os\":\"osx\",\"sudo\":\"required\",\"osx_image\":\"xcode11.6\",\"language\":\"node_js\",\"node_js\":\"10\",\"env\":[\"ELECTRON_CACHE=$HOME/.cache/electron\",\"ELECTRON_BUILDER_CACHE=$HOME/.cache/electron-builder\",\"TRAVIS_OS_NAME=macosx\",\"GITHUB_TOKEN=hdfh774jtgi94lgf0873hurf643h9id9k48fy3h9df09fk984jkk\",\"GH_TOKEN=hdfh774jtgi94lgf0873hurf643h9id9k48fy3h9df09fk984jkk\",\"CI=false\"]}]},\"compiler\":[\"gcc\",\"clang\"],\"cache\":{\"directories\":[\"assets\",\"node_modules\",\"$HOME/.cache/electron\",\"$HOME/.cache/electron-builder\"]},\"script\":[\"npm install\",\"npm run build\",\"npm run mac-release\"],\"before_cache\":[\"rm -rf $HOME/.cache/electron-builder/\"],\"notifications\":{\"email\":[\"lahiri.devs@gmail.com\"]}}"

// parsedJson = JSON.parse(convertedJson)
// console.log(parsedJson.matrix.include);
// console.log(JSON.parse(convertedJson));


// --------------------------------------------------------------------------------------------------------------


// yaml to json facing issue in double quotes
// testing it out
yamlString = `
branches:
    except:
        - "/^v\\d+\\.\\d+\\.\\d+$/"
`
const jsYaml = require('js-yaml')
yamlObj = jsYaml.safeLoad(yamlString, [schema=jsYaml.MINIMAL_SCHEMA]);
// yamlObj = jsYaml.safeLoad(yamlString, [skipInvalid=true]);
// yamlObj = jsYaml.load(yamlString)
console.log(yamlObj)
