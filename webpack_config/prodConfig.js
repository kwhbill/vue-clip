let webpack = require("webpack")
let merge = require("webpack-merge")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let CleanWebpackPlugin = require("clean-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let CopyWebpackPlugin = require("copy-webpack-plugin")
let AddAssetHtmlPlugin =require("add-asset-html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
let _ = require("lodash")
let baseConfig = require("./baseConfig")
let {resolvePath,checkAndDownLoadDll} = require("./common/utils")
let  {NODE_ENV,publicPath,distPath,port} =  require("./common/const")

checkAndDownLoadDll()

let mockProcess = require("../mock").process
let plugins =  ((NODE_ENV)=>{
    let plugins = [
        // new BundleAnalyzerPlugin(), // 查看打包树可视化插件
        // 清理产品产出
        new CleanWebpackPlugin(
            [
                resolvePath("./build/*.js"),
                resolvePath("./build/*.css"),
                resolvePath("./build/*.html"),
            ],
            {
                root: resolvePath(""),
                verbose: true
            }
        ),
        new VueLoaderPlugin(),


        // 直接 copy assets 至 build
        new CopyWebpackPlugin(
            [
                {from: resolvePath("./src/assets"), to: resolvePath("./build/assets") },
            ]
        ),
        // 暴露全局变量
        new webpack.ProvidePlugin({
            _: "lodash",
            ly: "ly",
        }),

        new webpack.DefinePlugin({
            "process.env.NODE_ENV" : JSON.stringify(NODE_ENV)
        }),
        // dll 引入
        new webpack.DllReferencePlugin({
            manifest: resolvePath(`./dll/manifest/renderer.json`),
            name: "renderer",
            sourceType: "var"
        }),


        new HtmlWebpackPlugin({
            template: resolvePath('./src/entry/index.html'),
            hash : true,
        }),

        // 页面追加：dll js 资源
        new AddAssetHtmlPlugin({
            filepath: resolvePath(`./build/dll/renderer.js`),
            publicPath: `${publicPath}dll`,
            hash: true,
            includeSourcemap: false,
            typeOfAsset: "js",
            outputPath: "./../node_modules/.dll_cache"  // 插件定向拷贝配置，犀利了。 只好拷贝到看不见的地方……
        }),
    ]

    if(NODE_ENV == "production"){
        plugins = plugins.concat([
            // 提取CSS
            new MiniCssExtractPlugin({
                filename: `[name].css?[hash]`,
                chunkFilename: `[id].css?[hash]`
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp:/\.css$/g,
                cssProcessor:require("cssnano"),
                cssProcessorPluginOptions:{
                    preset:['default',{discardComments:{removeAll:true}}]
                },
                canPrint:true
            })

        ])
    }
    return plugins
})(NODE_ENV)


var LoadersMap = {
    css: ["css-loader"],
    less: ["css-loader", "less-loader"],

}

function vueLoadersConfig(env){
    let conf = {}
    _.each(LoadersMap, (loaders, lang)=>{
        if(env == "development"){
            loaders.unshift("vue-style-loader")
        }else{
            loaders.unshift(MiniCssExtractPlugin.loader)
        }
        conf[lang] = loaders
    })
    return conf
}



module.exports =  merge.smart(baseConfig, {
    entry:{
        app : resolvePath("src/entry/main.js")
    },
    output: {
        path: resolvePath(`./build`),
        filename: `[name].js?[hash]`,
        chunkFilename: `[name].js?[chunkhash]`,
        publicPath: `${publicPath}`,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: vueLoadersConfig(NODE_ENV)
                },
            },
            {
                test: /\.css$/,
                use: NODE_ENV == "production"  ? [MiniCssExtractPlugin.loader].concat(LoadersMap["css"]) : ["style-loader" ].concat(LoadersMap["css"])
            },
          
            {
                test: /\.less$/,
                use: NODE_ENV == "production"  ? [MiniCssExtractPlugin.loader].concat(LoadersMap["less"]) : ["style-loader" ].concat(LoadersMap["less"])
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 102400,
                        name: "assets/images/[name].[ext]?[hash:7]"
                    }
                }
            },{
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 102400,
                        name: "assets/fonts/[name].[ext]?[hash:7]"
                    }
                }]
            }
        ]
    },
    plugins,
    resolve: {
        modules: [resolvePath('node_modules')],
        alias: {
            /* 各种目录 */
            'ly': resolvePath('src/common'),
            'src': resolvePath('src'),
            'assets': resolvePath('src/assets'),
        },
        extensions: [ '.js','.jsx',".css",".vue"]
    },
    mode: NODE_ENV == "production" ? "production" :  "development"  ,
    devtool: NODE_ENV == "production" ?  false : 'inline-source-map' ,
    devServer: {
        port,
        hot: true,
        contentBase:distPath,
        setup(app) {
            app.all(/^\/fb\/.+/, (req, res) => {
                mockProcess(req, res)
            })
        },
        proxy:{
            '/mail': {
              target: 'http://localhost:8089',
              changeOrigin: true
            },
            '/user': {
                target: 'http://localhost:8089',
                changeOrigin: true
              }
          },
    },
});
