(function(req, {Mock, require}){
    // let _ = require("lodash") // 加载第三方库, Mock 为 mockjs
    let data = {
        'item|2-5':[{
            'id|1-1000':1,
            'name':'@cword(5,10)',
            'isparent|1':[true,false]
        }]
    }
    data = Mock.mock(data)
    // 返回 response 内容体
    return {
        result: 0,
        data
    }
})
