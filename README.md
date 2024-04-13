
 

## Nodemon supaya bisa debug gunakan : 
### edit nodemon.json
{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec" : "babel-node ./server/server.js"
},

### untuk built-up hhhh: 

{
    "verbose": false,
    "watch": [
      "./server"
    ],
    "exec": "webpack --mode=development --config webpack.config.server.js && node ./dist/server.generated.js"
}
