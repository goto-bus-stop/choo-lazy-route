var html = require('choo/html')

module.exports = function main (state, emit) {
  return html`
    <body style="background: #fcc">
      <h1>main page</h1>
      <ul>
        <li><a href="/lazy-one">First lazy route</a></li>
        <li><a href="/lazy-two">Second lazy route</a></li>
      </ul>
    </body>
  `
}
