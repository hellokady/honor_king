const mongoose = require('mongoose')
const { model, Schema, SchemaTypes } = mongoose

const HerosSchema = new Schema({
    name: { type: String, required: true },
    picture: { type: String },
    categories: [{ type: SchemaTypes.ObjectId, ref: 'Category' }],
    skins: [{
        skin: { type: SchemaTypes.ObjectId, ref: 'Skins' },
        name: { type: String },
        url: { type: String }
    }],
    scores: {
        difficlut: { type: Number },//难度
        skill: { type: Number },    //技能
        attack: { type: Number },   //攻击
        survive: { type: Number }   //生存
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    followGoods: [{ type: SchemaTypes.ObjectId, ref: 'Goods' }],    //顺风出装
    againstGoods: [{ type: SchemaTypes.ObjectId, ref: 'Goods'  }],  //逆风出装
    usegeTips: { type: String },    //使用技巧
    battleTips: { type: String },    //对抗技巧
    teamTips: { type: String },    //团战思路
    partners: [{
        hero: { type: SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

module.exports = model('Heros', HerosSchema)
