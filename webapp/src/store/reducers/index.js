const context = require.context('./', true, /\.js$/)
let reducers = {}
context.keys().forEach((key) => {
    reducers = Object.assign(reducers, context(key))
})
module.export = Object.assign(module.exports, reducers)
