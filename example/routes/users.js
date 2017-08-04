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
