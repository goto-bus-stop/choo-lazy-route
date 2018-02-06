module.exports = function (app) {
  return function (load) {
    // TODO custom loading views
    var str = new String('<body></body>')
    str.__encoded = true
    return str
  }
}
