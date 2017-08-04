# Automatic mount routing for Express from file system (自动挂载express路由的中间件)

 this module can be used for（在下面这些情况可以使用）: 

- Don't want each routing file to be defined again （不想每个路由文件都要在定义一遍）
- Want middleware or API to automatically generate routes based on each routing file (想要中间件或者 api 根据每个路由文件自动去生成路由)
- Routing is only defined in the file （路由只想在文件中定义一遍）

## Install （安装）

```
$ npm install --save express-mountroutes
```

## Usage （使用）

### app.js

```javascript
var express = require('express');
var routes = require('../index')
var app = express();

// Here, as long as the routing file directory can be introduced（在这里只要把路由的文件目录传入就可以）
app.use(routes(__dirname + '/routes'))

var server = app.listen(3005, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


```

### user.js in routes

````
function test (req, res, next) {
  res.send('respond with a resource');
}

function change (req, res, next) {
  res.send('helloworld')
}

module.exports = [
  ['get', '/v1/test', test],
  ['get', '/v1/hello', change]
]

````

like this

![like this](http://ojlst39mq.bkt.clouddn.com/express.png)

## test

```
$ npm test
```