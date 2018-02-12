var app = require('choo')()
var lazy = require('../')()
var splitRequire = require('split-require')

app.use(lazy)
app.route('/', require('./views/main'))
app.route('/lazy-one', lazy(function (cb) {
  splitRequire('./views/lazyOne', cb)
}))
app.route('/lazy-two', lazy(function (cb) {
  splitRequire('./views/lazyTwo', cb)
}))

module.exports = app
if (typeof window !== 'undefined') app.mount('body')
