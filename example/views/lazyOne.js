var html = require('choo/html')

module.exports = function lazyOne (state, emit) {
  return html`
    <body style="background: #cfc">
      <h1>Green Route</h1>
      <p>This route is green. Really!</p>
      <p><a href="/">« back</a></p>
    </body>
  `
}
