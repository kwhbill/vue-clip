## 画啦啦学生客户端

### 存在问题

 * 随着产品越来越庞大，需要编译的库越来越多，导致开发速度下降
 * 老产品整体结构不清晰，并存在大量的路径引用


### 新特性

* 重新设计外部库的引用关系：
  * 将react,antd等第三方库与业务代码抽离开来，减少打包的大小，提升开发速度
* 给页面注册一个 ly 的全局对象，可以直接在业务代码中调用一些公共方法，比如 （ly.logger.uploadLog,ly.service）
* 更简便的目录系统和模块引用关系
* 更简便清晰的webpack脚手架，便于日后根据项目的发展做迭代或重构
* 添加了mock的使用

#### 目录

```
├── build  # 编译结果
├── dll    # 第三方库代码
├── mock   # mock 代码 
├── scripts  # 工具脚本目录
├── src    # 业务代码所在目录
│   ├── appConfig  # 项目配置
│   ├── assets     # 产品静态资源
│   │   ├── css
│   │   ├── images
│   │   ├── js
│   │   └── music
│   ├── common   # 公共的方法库
│   │   ├── index.js
│   │   ├── net.js
│   │   ├── storage.js
│   │   └── utils.js
│   ├── components  # 公共的vue组件库
│   ├── entry   # 打包入口所在目录
│   ├── pages   # 产品页面集合
│   │   ├── demo   # 页面demo
│   │   │   ├── components    # 页面demo的组件库
│   │   │   ├── images        # 页面demo的图片库
│   │   │   └── index.vue   
│   │   ├── demo2   # 页面demo2
│   │   │   ├── components    # 页面demo2的组件库
│   │   │   ├── images        # 页面demo2的图片库
│   │   │   └── index.vue      
│   │   └── index.js
│   ├── router    # 路由状态管理目录
│   └── store     # vue状态管理目录
│       ├── actions.js
│       ├── index.js
│       ├── mutations.js
│       └── states.js
├── webpack_config  # webpack_config目录
│   ├── baseConfig.js
│   ├── common   
│   │   ├── const.js
│   │   └── utils.js
│   ├── dllConfig.js
│   └── prodConfig.js
```

### 开发
*  yarn dev

```
启动后浏览器访问[http://localhost:3000](http://localhost:3000)
```

### 部署生产

  * yarn build

```
 将项目打包到 `build` 目录下
```

