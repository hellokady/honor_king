const mongoose = require('mongoose')
const { model, Schema, SchemaTypes } = mongoose

const AdSchema = new Schema({
    name: { type: String, required: true },
    items: [{
        image: { type: String },
        url: { type: String }
    }]
})

module.exports = model('Ads', AdSchema)
