const context = require.context('./', false, /\.js$/)
let actions = {}
context.keys().forEach((key) => {
    actions = Object.assign(actions, { ...context(key) })
})
module.exports = Object.assign(module.exports, actions)
