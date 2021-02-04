module.exports = options => async(req, res, next) => {
        const AdminUser = require('../modules/AdminUser')
        const assert = require('http-assert')
        const jwt = require('jsonwebtoken')
        
        assert(req.headers.authorization, 422, '请先登录')
        // 解析前端传递token
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 422, '请先登录')
        const {id, exp} = jwt.verify(token, req.app.get('secret'));
        assert(id, 422, '请先登录')
        assert(exp < Date.now(), 422, '令牌已过期,请重新登录');
        // if(exp < Date.now()) {
        //     return res.status(422).send({
        //         message: '令牌已过期,请重新登录'
        //     })
        // }
        req.user = await AdminUser.findById(id);  //将找到的用户挂在到req对象中
        assert(req.user, 422, '请先登录');
        await next();
}