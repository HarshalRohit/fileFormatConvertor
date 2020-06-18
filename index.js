exports.handler = async (event, context) => {

  const body = event['body'];

  let { err, result } = parseBody(body);
  if(err){
    const statusCode = 400;
    const responseBody = {
      status: 'error',
      statusText: err,
      result: ''
    };
    return createResponseObj(statusCode, null, responseBody);
  }

  // parenthesis are required to use es6 object destructuring 
  ({ err, result } = handleConversion(result));
  
  let statusCode, responseBody;

  if(err){
    statusCode = 400;
    responseBody = {
      status: 'error',
      statusText: err,
      result: '',
    };

  } else {
    statusCode = 200;
    responseBody = {
      status: 'success',
      statusText: 'conversion successful.',
      result: result,
    };
  }
  
  return createResponseObj(statusCode, null, responseBody);
};

/*
  Body will contain following in JSON
    source-format,
    target-format, 
    content
*/
const parseBody = (body) => {
  if(!body)
    return { 'err': 'request body empty.', 'result': null };
  
  let bodyInJson;
  
  try {
    bodyInJson = JSON.parse(body);
  } catch (error) {
    return { 'err': 'request body JSON parse error.', 'result': null }; // can change to generic error
  }

  const { sourceFormat, targetFormat, content } = bodyInJson;
  if (!sourceFormat || !targetFormat || !content)
    return { 'err': 'missing field params.', 'result': null }; // can change to generic error
    
  return { 'err': null, 'result': bodyInJson };
};

const createResponseObj = (statusCode, headers, body) => {
  
  const defaultStatusCode = 200;
  const defaultHeaders = { 'content-type': 'application/json' };
  const defaultBody = {};

  let response = {}

  if (statusCode === null)
    response.statusCode = defaultStatusCode
  else
    response.statusCode = statusCode;

  if(headers === null)
    response.headers = defaultHeaders;
  else
    response.headers = headers;

  if(body === null)
    response.body = JSON.stringify(defaultBody);
  else
    response.body = JSON.stringify(body);

  return response;
};

const handleConversion = (body) => {
  const supportedConversions = ['json2yaml', 'yaml2json'];
  const { sourceFormat, targetFormat, content } = body;
  
  const currentConversion = sourceFormat.concat('2', targetFormat)
  if(!supportedConversions.includes(currentConversion)){
    let errText = 'source to target conversion not yet supported.';
    
    return { 'err': errText, 'result': null };
  }
  
  let err, result;
  ({ err, result } = preprocessContent(sourceFormat, content));
  // err will not occur but can be useful in future
  if(err){
    return { 'err': err, 'result': null };
  }
  
  ({ err, result } = parseContent(sourceFormat, result));
  if(err){
    return { 'err': err, 'result': null };
  }

  ({ err, result } = convertContent(targetFormat, result));
  if(err){
    return { 'err': err, 'result': null };
  }

  return { 'err': null, 'result': result };
};

// keeping the return format similar to other methods 
//  in handleConversion
const preprocessContent = (srcFormat, content) => {
  
  // Perform preprocessing for required formats
  let res;
  switch(srcFormat){
    case "yaml":
      // replace double quotes around regex strings with 
      //  single quotes
      // Algo: search for the string that contains
      //  "/ and /", 
      //  replace the double quotes with single quotes
      //  repeat till no such match remains
      // CAN BE OPTIMIZED, WILL LOOK LATER
      while (content.search(/("\/).*(\/")/) != -1) {
        let matchObj = content.match(/("\/).*(\/")/);
        let startIdx = matchObj.index
        let endIdx = startIdx + matchObj[0].length

        content = content.slice(0, startIdx) + `'` + 
          content.slice(startIdx+1, endIdx-1) + `'` + 
          content.slice(endIdx)

      }
      res = content
      break;

    default:
      // No error 
      res = content
  }
  
  return { 'err': null, 'result': res }; 
}

const parseContent = (srcFormat, content) => {
  let parser;
  
  switch(srcFormat){
    case "json":
      parser = JSON.parse;
      break;
    case "yaml":
      parser = require('js-yaml').safeLoad;
      break;
    default:
      // will not reach here, as already handled in handleConversion
      return { 'err': 'parser for source format not found.',
               'result': null }; // can change to generic error
  }

  let result;
  try {
    const parsedContent = parser(content);
    
    result = { 'err': null, 'result': parsedContent };
  } catch(e){
    // err = e;
    result = { 'err': 'cannot parse content in source format.',
               'result': null }; // can change to generic error
  };

  return result;
};

const convertContent = (targetFormat, parsedContent) => {
  let convertor;
  
  switch(targetFormat){
    case "json":
      convertor = JSON.stringify;
      break;
    case "yaml":
      convertor = require('js-yaml').safeDump;
      break;
    default:
      return { 'err': 'convertor for target format not found.',
               'result': null }; // can change to generic error
  }

  let result;
  try {
    const convertedContent = convertor(parsedContent);
    
    result = { 'err': null, 'result': convertedContent };
  } catch(e){
    // err = e;
    result = { 'err': 'cannot convert content to target format.',
               'result': null }; // can change to generic error
  }

  return result;
};
