const mongoose = require('mongoose')
const { model, Schema } = mongoose

const SkinsSchema = new Schema({
    name: { type: String, required: true },
    picture: { type: String }
})

module.exports = model('Skins', SkinsSchema)
