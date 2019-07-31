var _ = require("lodash")
var fs = require("fs")
var path = require("path")
let {execSync}  = require("child_process")

function execWrap(argsCount, argsTip, resolve) {
    let args = _.slice(process.argv, 2)
    if(args.length < argsCount){
        console.log("参数有误：", argsTip)
        return
    }
    resolve(args, execSync)
}

execWrap(1, "yarn mock-gen -- uc/common/user_info", (args, execSync)=>{
    let url = args[0]
    let destPath = `./mock/${url}.js`
    let destDir = path.dirname(destPath)
    let srcPath = "./scripts/tpls/mock.js"
    if(!fs.existsSync(destPath)){ // 若不存在// ，则以模板为作为源
        execSync(`mkdir -p ${destDir}`)
        execSync(`cp ${srcPath} ${destPath}`)
    }
})
