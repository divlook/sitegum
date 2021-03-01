const path = require('path')

/**
 * @param {string} pathname
 */
const workspace = (pathname) => path.join(process.cwd(), pathname)

/**
 * @param {string} pathname
 */
const dir = (pathname) => path.resolve(__dirname, '../', pathname)

const defaultConfig = {
    title: 'Sitegum',
    publicPath: '/',
}

/**
 * @returns {typeof defaultConfig}
 */
const loadConfig = () => {
    try {
        const json = require(workspace('sitegum.config.json'))

        return {
            ...defaultConfig,
            ...json,
        }
    } catch {
        return defaultConfig
    }
}

module.exports = {
    dir,
    loadConfig,
    workspace,
}
