/**
 * Created by mac on 2019/6/3.
 */
/**
 * Base webpack config used across other specific configs
 */


let  webpack  = require("webpack") ;

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        //在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NamedModulesPlugin(),
    ],
};
