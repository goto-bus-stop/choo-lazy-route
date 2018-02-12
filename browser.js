var log = require('nanologger')('choo-lazy-route')

var IDLE = 0
var LOADING = 1
var LOADED = 2

module.exports = function () {
  var app
  var defaultTagName = 'body'

  store.storeName = 'choo-lazy-route'
  function store (state, emitter, _app) {
    app = _app
  }

  function route (load) {
    if (typeof load !== 'function') {
      throw new TypeError('choo-lazy-route: load must be a function')
    }

    var loadingState = IDLE
    var route = null
    var view = null

    // Keep showing the old page while we load
    var tagName = app && app._tree
      ? app._tree.nodeName
      : defaultTagName
    var proxy = document.createElement(tagName)
    proxy.isSameNode = function () { return true }

    return function (state, emit) {
      // Begin loading the bundle on the first call
      if (loadingState === IDLE) {
        log.info('begin loading', state.route)
        route = state.route
        loadingState = LOADING
        var p = load(onload)
        // Promise support (`import()` syntax)
        if (p && p.then) p.then(onload.bind(null, null), onload)

        return proxy
      }

      if (loadingState === LOADING) {
        return proxy
      }

      // loadingState === LOADED
      return view(state, emit)

      function onload (err, _view) {
        if (err) {
          log.fatal('failed to load', route, err.message)
          emit('error', err)
          loadingState = IDLE
          return
        }
        log.info('loaded', route)
        loadingState = LOADED
        view = _view

        // Only rerender if we are still on the same route
        if (state.route === route) emit('render')
      }
    }
  }

  function lazy (a, b, c) {
    if (arguments.length === 3) return store(a, b, c)
    return route(a)
  }

  lazy.store = store
  lazy.route = route
  return lazy
}
