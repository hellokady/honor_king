const mongoose = require('mongoose')
const { model, Schema, SchemaTypes } = mongoose

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    categories: [{ type: SchemaTypes.ObjectId, ref: 'Category' }],
    body: { type: String }
})

module.exports = model('Articles', ArticleSchema)
