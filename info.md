# This file will contain frequently used commands and links
### update function
```
aws lambda update-function-code --function-name nodeSimpleHttp \
 --zip-file fileb://temp.zip
```


### ignore dir while creating zip
```
zip -r temp.zip . -x '*.git*' 'Info.md' './tests*'
```
### combined commands
```
rm temp.zip
zip -r temp.zip . -x '*.git*' 'Info.md' './tests*'
aws lambda update-function-code \
 --function-name nodeSimpleHttp \
 --zip-file fileb://temp.zip
```