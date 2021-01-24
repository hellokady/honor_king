const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads')) //开放上传接口访问静态资源的权限

require('./routes/admin')(app)
require('./plugins/db')(app)

app.get('/', (_, res) => {
    res.send('ok')
})

app.listen(8090, () => {
    console.log('run server of success~~~')
})