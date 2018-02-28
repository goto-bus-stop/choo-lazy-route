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

Create an instance of the lazy route manager.

### `app.use(lazyRoute)`

Associate the lazy route manager with an app. The `lazyRoute` store also configures the app to take advantage of the experimental prefetch feature in bankai, so that server side rendering will include lazy routes.

### `app.route('/', lazyRoute(function load() {}))`

Create a lazy route. The `load` function can return a Promise or use the callback in its first parameter.

## todo

 - timeout
 - loading view (show after 700ms or so)
