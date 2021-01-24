const express =require('express')
const router = express.Router()
const queryModelArr = new Set(['Category'])
const multer = require('multer') //处理上传图片的第三库
const serverUrl = 'http://localhost:8090/uploads/'

const checkModelNeedPopulate = (modelName, property) => {
    return queryModelArr.has(modelName) ? { populate: property } : {}
}
// 上传图片中间件
const upload = multer({ dest: __dirname + '/../../uploads'})

module.exports = app => {
    
    router.post('/', async(req, res) => {
        await req.Model.create(req.body)
        res.send({
            success: true,
            message: '创建成功'
        })
    })

    router.get('/', async(req, res) => {

        const list = await req.Model.find().setOptions(req.Pupolate)
        res.send({
            success: true,
            list
        })
    })

    router.get('/:id', async(req, res) => {
        const detail = await req.Model.findById(req.params.id)
        res.send({
            success: true,
            detail
        })
    })

    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: '删除成功'
        })
    })

    router.put('/:id', async(req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: '编辑成功'
        })
    })

    // 动态匹配模型
    app.use('/admin/api/rest/:resource',async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(__dirname + `/../../modules/${modelName}`)
        req.Pupolate = checkModelNeedPopulate(modelName, 'parent')
        next()
    }, router)

    // 上传图片接口
    app.use('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file //upload中间件会给req对象增加一个file属性
        file.url = `${serverUrl}${file.filename}`
        res.send({
            success: true,
            message: '上传成功',
            url: file.url
        })
    })
}