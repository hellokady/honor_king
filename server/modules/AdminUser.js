const mongoose = require('mongoose')
const { model, Schema } = mongoose

const AdminUserSchema = new Schema({
    username: {
        type: String,
        unique: true //账号唯一性
    },
    password: {
        type: String,
        select: false, //false默认是不查出该条数据
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }, //需要加盐加密 散列 hashSync(需要加密的数据，散列等级推荐10-12)
    nickname: { type: String }
})

module.exports = model('AdminUsers', AdminUserSchema)
