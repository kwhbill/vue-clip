(function(req, {Mock, require}){
    // let _ = require("lodash") // 加载第三方库, Mock 为 mockjs
    let data = {}
    data = Mock.mock(data)
    // 返回 response 内容体
    return {
        result: 0,
        data
    }
})