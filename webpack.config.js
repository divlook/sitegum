const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const { mode } = require('./webpack/env')
const { dir, loadConfig, workspace, route } = require('./webpack/utils')

const sitegumConfig = loadConfig()

const baseConfig = webpack.config.getNormalizedWebpackOptions({
    mode,
    entry: {},
    output: {
        filename: '[name][contenthash].js',
        path: workspace('dist'),
        publicPath: route('/'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HandlebarsPlugin({
            entry: workspace('src/pages/**/*.hbs'),
            output: workspace('dist/[path]/[name].html'),
            partials: [
                workspace('src/components/**/*.hbs'),
            ],
            helpers: {
                nameOfHbsHelper: Function.prototype,
                projectHelpers: dir("helpers/**/*.helper.js")
            },
            data: sitegumConfig,
        }),
    ],
    stats: 'minimal',
})

module.exports = () => {
    if (mode === 'development') {
        baseConfig.devtool = 'inline-source-map'
        baseConfig.devServer = {
            contentBase: workspace('dist'),
            port: 3000,
            hot: true,
            publicPath: route('/'),
            openPage: route('/').replace(/^\//, ''),
        }
    }

    return baseConfig
}
