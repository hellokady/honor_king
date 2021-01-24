const mongoose = require('mongoose')
const { model, Schema } = mongoose

const GoodsSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String }
})

module.exports = model('Goods', GoodsSchema)
