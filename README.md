# Ant Design Pro

用react、antDesign搭建一个CMS系统；


## 下载

```bash
$ git clone 该项目的地址
$ cd 进入该项目
$ sudo npm install （给上最高的权限）
# 在npm install puppeteer 插件的时候 系统会让跳过下载安装、这里我们需要忽略系统的设置
$ sudo npm i --save puppeteer —ignore-scripts
# 安装依赖之后要给 node_modules 最高的权限 保证指令的正常执行；
$ npm start         # visit http://localhost:8000
```


## other

```bash
$ ├── mock                     # 本地模拟数据
$ ├── public                   # 存放公共资源
$ ├── src
$ │   ├── assets               # 本地静态资源
$ │   ├── common               # 导航信息和路由的配置
$ │   ├── components           # 通用组件的封装，如表格、表单
$ │   ├── e2e                  # 集成测试用例
$ │   ├── layouts              # 通用布局，整个网站的共用导航栏，页脚和主体部分
$ │   ├── models               # dva model
$ │   ├── routes               # 浏览器中所看到的页面
$ │   ├── services             # 后台接口服务
$ │   ├── utils                # 工具库
$ │   ├── g2.js                # 可视化图形配置
$ │   ├── theme.js             # 主题配置
$ │   ├── index.ejs            # HTML 入口模板，相当于index.html
$ │   ├── index.js             # 应用入口
$ │   ├── index.less           # 全局样式
$ │   └── router.js            # 路由入口
$ ├── tests                    # 测试工具
$ ├── README.md
$ └── package.json
```
