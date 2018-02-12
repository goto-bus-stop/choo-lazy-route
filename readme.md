# choo-lazy-route

```js
var app = choo()
var splitRequire = require('split-require')
var lazyRoute = require('choo-lazy-route')()

app.use(lazyRoute)
app.route('/lazy-route', lazyRoute(function (cb) {
  splitRequire('./views/lazyView', cb)
}))
```

## API

### `lazyRoute = require('choo-lazy-route')()`

### `app.use(lazyRoute)`

### `app.route('/', lazyRoute(function () {}))`

## todo

 - timeout
 - loading view (show after 700ms or so)
