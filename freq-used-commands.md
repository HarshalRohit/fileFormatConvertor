# This file will contain frequently used commands and links
### update function
```
aws lambda update-function-code --function-name formatConvert \
 --zip-file fileb://temp.zip
```

### include dir while creating zip
```
zip -r temp.zip . -i 'node_modules/*' 'index.js'
```

### ignore dir while creating zip
```
zip -r temp.zip . -x '*.git*' 'Info.md' './tests*'
```

### combined commands
```
rm temp.zip
zip -r temp.zip . -i 'node_modules/*' 'index.js'
aws lambda update-function-code \
 --function-name formatConvert \
 --zip-file fileb://temp.zip
 
```