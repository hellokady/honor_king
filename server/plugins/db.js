const mongoose = require('mongoose')
const { connect,model,Schema } = mongoose

module.exports = app => {
    connect('mongodb://localhost:27017/moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => {
        console.log('connect mongoose of success~~~');
    })
}