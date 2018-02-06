var app = require('choo')()
var lazyRoute = require('../')(app)
var splitRequire = require('split-require')

app.route('/', require('./views/main'))
app.route('/lazy-one', lazyRoute(function (cb) {
  splitRequire('./views/lazyOne', cb)
}))
app.route('/lazy-two', lazyRoute(function (cb) {
  splitRequire('./views/lazyTwo', cb)
}))

module.exports = app
if (typeof window !== 'undefined') app.mount('body')
