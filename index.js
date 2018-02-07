var parallel = require('run-parallel')

var IDLE = 0
var LOADING = 1
var LOADED = 2

module.exports = function (app) {
  var loaders = []

  function lazyRoute (load) {
    var view = null
    var loadingState = IDLE

    function doLoad (cb, emit) {
      loadingState = LOADING
      load(function (err, _view) {
        if (err) {
          loadingState = IDLE
          return cb(err)
        }
        loadingState = LOADED
        view = _view
      })
    }
    loaders.push(doLoad)

    return function (state, emit) {
      if (loadingState === IDLE) {
        doLoad(function (err) {
          if (err) emit('error', err)
          else emit('render')
        }, emit)
      }
      if (loadingState === LOADING) {
        // TODO custom loading views
        var str = new String('<body></body>') // eslint-disable-line no-new-wrappers
        str.__encoded = true
        return str
      }
      return view(state, emit)
    }
  }

  lazyRoute.all = function (cb) {
    parallel(loaders, function (err) {
      if (err) cb(err)
      else cb()
    })
  }

  return lazyRoute
}
