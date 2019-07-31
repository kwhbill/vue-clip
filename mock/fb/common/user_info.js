(function(req, {Mock, require}){
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
