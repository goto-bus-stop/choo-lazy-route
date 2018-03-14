var parallel = require('run-parallel')

var IDLE = 0
var LOADING = 1
var LOADED = 2

module.exports = function () {
  var loaders = []
  // Store these for `loadAll()`
  var _state, _emit

  store.storeName = 'choo-lazy-route'
  function store (state, emitter, _app) {
    _state = state
    _emit = emitter.emit
  }

  function route (load) {
    var view = null
    var loadingState = IDLE
    var promise = null

    function doLoad (state, emit) {
      if (loadingState === LOADING) return promise

      var route = state.route
      emit('lazy-route:load', route)

      loadingState = LOADING
      promise = new Promise(function (resolve, reject) {
        var p = load(function (err, _view) {
          if (err) {
            loadingState = IDLE
            return reject(err)
          }
          emit('lazy-route:loaded', route, _view)
          loadingState = LOADED
          view = _view
          resolve()
        })
        if (p && p.then) p.then(resolve, reject)
      })

      if (state._experimental_prefetch) {
        state._experimental_prefetch.push(promise)
      }

      return promise
    }
    loaders.push(doLoad)

    return function (state, emit) {
      // already loaded
      if (view) {
        return view(state, emit)
      }

      // Did not start loading
      if (!promise) {
        doLoad(state, emit).catch(function (err) {
          emit('error', err)
        })
      }

      // TODO custom loading views
      var str = new String('<body></body>') // eslint-disable-line no-new-wrappers
      str.__encoded = true
      return str
    }
  }

  function loadAll (cb) {
    var promises = loaders.map(function (load) {
      return load(_state, _emit)
    })
    return Promise.all(promises).then(cb.bind(null, null), cb)
  }

  function lazy (a, b, c) {
    if (arguments.length === 3) return store(a, b, c)
    return route(a)
  }

  lazy.store = store
  lazy.storeName = store.storeName
  lazy.route = route
  lazy.all = loadAll
  return lazy
}
