# fileFormatConvertor
+ This repository is the codebase for the API to be hosted on AWS lambda (or other SAM). <br />
+ The API will convert the data in one format (eg. JSON) to other required format (eg. YAML). <br />
+ The project is written in NodeJS. <br />
More details will be added detail :) <br />


## Usage
The API is currently deployed on AWS lambda. <br />
URL: https://sitz7wsrs3.execute-api.us-east-2.amazonaws.com/nodeSimpleHttp <br />
Make a post request to the above URL,  with **content-type** header set to **application/json** and set the body as shown in example below:

    {
	    "sourceFormat": "yaml", // current format
	    "targetFormat": "json", // format to convert to 
	    "content": "---\nfoo: bar\nbaz: \n  - qux\n  - asda\n "
    }


## Third party libraries used
**TO-DO**


