module.exports = options => async(req, res, next) => {
    const queryModelArr = new Set(['Category'])
    const checkModelNeedPopulate = (modelName, property) => {
        return queryModelArr.has(modelName) ? { populate: property } : {}
    }
    const modelName = require('inflection').classify(req.params.resource)
    
    req.Model = require(__dirname + `/../modules/${modelName}`)
    req.Pupolate = checkModelNeedPopulate(modelName, 'parent')
    next()
}