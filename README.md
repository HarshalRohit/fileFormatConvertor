# configuration file converter

## Details
+ This repository is the codebase for the API to be hosted on AWS lambda (or other SAM). <br />
+ The API will convert the data in one format (eg. JSON) to other required format (eg. YAML). <br />
+ The project is written in NodeJS. <br />
+ Formal API Documentation can be found [here](https://app.swaggerhub.com/apis-docs/HarshalRohit/try-swagger/1.0.0). <br />
+ The API is tested using _Postman Test Scripts_.
+ More details will be added detail :) <br />


## Usage
The API is currently deployed on AWS lambda. <br />
URL: https://m5ju2ktnxe.execute-api.us-east-2.amazonaws.com/formatConvert <br />
Make a post request to the above URL,  with **content-type** header set to **application/json** and set the body as shown in example below:
```json
{
  "sourceFormat": "yaml", 
  "targetFormat": "json", 
  "content": "---\nfoo: bar\nbaz: \n  - qux\n  - asda\n "
}
```

## ISSUES
### ISSUE 1
Parsing string containing regex enclosed in double quotes (example below) raises error
```yaml
branches:
    except:
        - "/^v\\d+\\.\\d+\\.\\d+$/" // this string
```
Such double quotes need to be replaced with single quotes. Its fixed for now but this may create new bugs.
## Third party libraries used
+ [js-yaml](https://github.com/nodeca/js-yaml)


