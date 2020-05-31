/*
  Response Format - AWS 
    need to http status code in statusCode field
    any headers if required then in separate js obj
    body in js obj
    Eg: 
    response = {  statusCode: 404, 
                  headers: {},
                  body: {}
                }
    
  The body js obj will include the following keys:
    status  - 'error' | 'success'
    statusText - short descriptive message
    body    - the converted text
  ** MAY CHANGE AFTER DISCUSSION **
    
*/

/*
  *****JUST FOR REFERENCE*****
  Flow could be like this
  Verify the body contents          - done
    error if                        - done
      body empty                    - done
      required keys not present     - done
  extract the contents              - done
  decide the `'from format' and 'to format'
    error if 
      conversion not supported
  parse in 'from format'
    error in parsing
  call converter of 'to format'
    error should not occur here but lets see later
  return the converted contents
  
*/

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
      statusText: 'Conversion successful.',
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
    return { 'err': 'Request body empty.', 'result': null };

  try {
    bodyInJson = JSON.parse(body);
  } catch (error) {
    return { 'err': 'Request body JSON parse error.', 'result': null }; // change to generic error later
  }


  const { sourceFormat, targetFormat, content } = bodyInJson;
  if (!sourceFormat || !targetFormat || !content)
    return { 'err': 'missing field params.', 'result': null }; // change to generic error later
    
  return { 'err': null, 'result': bodyInJson };
};

const createResponseObj = (statusCode, headers, body) => {
  
  const defaultStatusCode = 200;
  const defualtHeaders = { 'content-type': 'application/json' };
  const defaultBody = {};

  let response = {}

  if (statusCode === null)
    response.statusCode = defaultStatusCode
  else
    response.statusCode = statusCode;

  if(headers === null)
    response.headers = defualtHeaders;
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
  ({ err, result } = parseContent(sourceFormat, content));
  if(err){
    return { 'err': err, 'result': null };
  }

  ({ err, result } = convertContent(targetFormat, result));
  if(err){
    return { 'err': err, 'result': null };
  }

  return { 'err': null, 'result': result };
};


const parseContent = (sourceFormat, content) => {
  let parser;
  
  switch(sourceFormat){
    case "json":
      parser = JSON.parse;
      break;
    case "yaml":
      parser = require('js-yaml').safeLoad;
      break;
    default:
      return { 'err': 'parser for source format not found.',
               'result': null }; // can change to generic error
  }

  let result;
  try {
    parsedContent = parser(content);
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
    convertedContent = convertor(parsedContent);
    result = { 'err': null, 'result': convertedContent };
  } catch(e){
    // err = e;
    result = { 'err': 'cannot convert content to target format.',
               'result': null }; // can change to generic error
  }

  return result;
};
