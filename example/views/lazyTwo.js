var html = require('choo/html')

module.exports = function lazyTwo (state, emit) {
  return html`
    <body style="background: #ccf">
      <h1>Blue Route</h1>
      <p>This route is blue. Really!</p>
      <p><a href="/">« back</a></p>
    </body>
  `
}
