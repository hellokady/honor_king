const mongoose = require('mongoose')
const { model, Schema, SchemaTypes } = mongoose

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = model('Category', CategorySchema)
