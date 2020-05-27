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
    status  - true | false (will decide later whether to include or not)
    message - short descriptive message
    data    - the converted text
  ** THINK AGAIN ABOUT THIS **
    
*/

exports.handler = async (event, context) => {


  const body = event['body']
  let { err, result } = parseBody(body);
  
  if(err){
    const statusCode = 400;
    const responseBody = {
      status: 'error',
      statusText: err,
      body: ''
    };
    return createResponseObj(statusCode, null, responseBody);
  }

  const { sourceFormat, targetFormat, content } = result;

  // if()
    
    /*
      Flow could be like this
      Verify the body contents
        error if 
          body empty
          required keys not present
      extract the contents
      decide the `'from format' and 'to format'
        error if 
          conversion not supported
      parse in 'from format'
        error in parsing
      call converter of 'to format'
        error should not occur here but lets see later
      return the converted contents
      
    */
  
  
  
  const temp = {
    's': sourceFormat,
    't': targetFormat,
    'content': content,
  };

  const responseBody = {
    'status': 'success',
    'statusText': 'Conversion success!!!',
    'body': temp,
  };
  
  return createResponseObj(200, null, responseBody);
};

/*
  Body will contain following in JSON
    source-format,
    target-format, 
    content
*/
// for now just returns the same object
//  but might change in future - after discussion
const parseBody = (body) => {
  if(!body)
    return { 'err': 'Request body empty.', 'result': null };

  try {
    bodyInJson = JSON.parse(body);
  } catch (error) {
    return { 'err': 'JSON parse error.', 'result': null }; // change to generic error later
  }


  const { sourceFormat, targetFormat, content } = bodyInJson;
  if (!sourceFormat || !targetFormat || !content)
    return { 'err': 'missing field params.', 'result': null }; // change to generic error later
    
  // seems repetitive task here
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