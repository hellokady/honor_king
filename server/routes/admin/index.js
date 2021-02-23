const express =require('express')
const router = express.Router()
const multer = require('multer') //处理上传图片的第三库
const serverUrl = 'http://localhost:8090/uploads/'
const jwt = require('jsonwebtoken'); //生成token
const AdminUser = require('../../modules/AdminUser');
const assert = require('http-assert'); //错误捕捉

// 上传图片中间件
const upload = multer({ dest: __dirname + '/../../uploads'})

// 登录校验中间件
const authMiddleware = require('../../middleware/auth')

// 资源模型中间件
const resourceMiddleware = require('../../middleware/resource')

module.exports = app => {
    
    // 创建资源
    router.post('/', async(req, res) => {
        await req.Model.create(req.body)
        res.send({
            success: true,
            message: '创建成功'
        })
    })

    // 资源列表
    router.get('/', async(req, res) => {
        const list = await req.Model.find().setOptions(req.Pupolate)
        res.send({
            success: true,
            list
        })
    })

    // 资源详情
    router.get('/:id', async(req, res) => {
        const detail = await req.Model.findById(req.params.id)
        res.send({
            success: true,
            detail
        })
    })

    // 删除资源
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: '删除成功'
        })
    })

    // 更新资源
    router.put('/:id', async(req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true,
            message: '编辑成功'
        })
    })

    // 动态匹配模型
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 上传图片接口
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
        const file = req.file //upload中间件会给req对象增加一个file属性
        file.url = `${serverUrl}${file.filename}`
        res.send({
            success: true,
            message: '上传成功',
            url: file.url
        })
    })

    // 登录接口
    app.post('/admin/api/login', async(req, res) => {
        const { username, password } = req.body;

        // 1.查找用户
        // select("+需要找出来的数据字段") 强制查找
        const user = await AdminUser.findOne({username}).select('+password');
        
        assert(user, 422, '该用户不存在'); // (判断数据存在，不存在的状态码，错误信息)
        // if(!user) {
        //     return res.status(422).send({
        //         message: '该用户不存在'
        //     })
        // }
 
        // 2.校验密码，compareSync(明文,密文)
        const isValid = require('bcrypt').compareSync(password, user.password);
        assert(isValid, 422, '密码错误')
        // if(!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }

        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'), { expiresIn: '1h' });
        res.send({
            success: true,
            message: "登录成功",
            token,
            nickname: user.nickname
        })
    })

    //  注册接口
    app.post('/admin/api/register', async(req, res) => {
        const userInfo = req.body;
        assert(userInfo, 422, "请完善注册信息");
        const AdminUser = require('../../modules/AdminUser');
        await AdminUser.create(userInfo);
        res.send({
            success: true,
            message: '注册成功'
        })
    })

    // 退出登录
    app.post('/admin/api/loginout', async(req, res) => {
        res.send({
            success: true,
            message: "退出成功"
        })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.status || err.statusCode || 422).send({
            message: err.message
        })
    })
}