# admin(后台)

技术栈：
    element-ui
    axios

**富文本编辑器**（quill） => vue2-editor

碰到的一些问题：

​	data中对象层级嵌套过审访问undefined => 在data中定义

​	对象中不存在的属性直接赋值不会响应 => $set

**权限的控制**：

​	根据interceptors.requset.use(请求拦截器)给请求头加上令牌，后端校验

​	router.beforeEach

​	axios拦截器


运行：npm run serve | yarn start

# server(后端)

技术栈：
    express
    mongoose
    cors
运行：npm run serve

**通用版CRUD接口**

routes/admin/index

动态匹配模型： **inflection**（处理单词格式的转换）

**跨域**（cors）

**图片上传** （multer第三方库）

**管理员密码的加盐加密** （bcrypt）

**生成用户token**（jsonwebtoken）

**捕捉错误**（http-assert）

**中间件校验** middleware

# web(客户端)