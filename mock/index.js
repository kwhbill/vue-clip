let _ = require("lodash")
let fs = require("fs")
let vm = require("vm")
let Mock = require("mockjs")

function process(req, res){
    let reqPath = _.trim(req.path, "/")
    let filePath = `mock/${reqPath}.js`
    let data = {
        code: -404,
        message: `unfound mockjs file: ${filePath}`
    }
    if(fs.existsSync(filePath)){
        console.info("MOCK", req.method, req.path)
        let code = fs.readFileSync(filePath, {encoding: "utf8"})
        code = vm.runInThisContext(code)
        data = code(req, {require, Mock})
    }else{
        console.error("MOCK UNFOUND", req.method, req.path)
    }

    res.writeHead(200, {
        "Content-Type": "text/json; charset=utf-8"
    })
    res.end(JSON.stringify(data))
}
module.exports = {process}
