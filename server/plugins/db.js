module.exports = app => {
    const mongoose = require('mongoose');
    const { connect } = mongoose;

    connect('mongodb://localhost:27017/moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => {
        console.log('connect mongoose of success~~~');
    })
}