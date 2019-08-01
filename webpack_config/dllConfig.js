/**
 * Builds the DLL for development electron renderer process
 */

let webpack = require("webpack")
let merge = require("webpack-merge")
let path  = require("path") ;
let CleanWebpackPlugin = require("clean-webpack-plugin")
let {dependencies}  = require("../package.json.js") ;
let {publicName} =  require("./common/const");
let {resolvePath} = require("./common/utils")
let baseConfig = require("./baseConfig")
module.exports =  merge(baseConfig, {
    entry: {
        renderer: (
            Object
                .keys(dependencies || {})
        )
    },

    output: {
        pathinfo: true,
        path: resolvePath("./build/dll"),
        filename: `[name].js?[chunkhash]`,
        publicPath: `${publicName}dll/`,
        chunkFilename: `[name].js?[chunkhash]`,
        library: `[name]`,
        libraryTarget: "var"
    },

    plugins: [
        // 清理 dll 生成
        new CleanWebpackPlugin(
            [
                resolvePath("./build/dll"),
                resolvePath("./dll/manifest/*"),
            ],
            {
                root: resolvePath(""),
                verbose: true
            }
        ),
        // 生成 dll 清单
        new webpack.DllPlugin({
            name: "[name]",
            path: resolvePath(`./dll/manifest/[name].json`)
        })
    ],
});
