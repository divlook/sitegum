const path = require('path')

/**
 * @type {typeof defaultConfig}
 */
let sitegumConfig

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

/**
 * @param {string} to
 */
const route = (to = '/') => {
    if (!sitegumConfig) {
        sitegumConfig = loadConfig()
    }

    const segments = ['']

    const prefix = sitegumConfig.publicPath
        .replace(/^\//, '')
        .replace(/\/$/, '')

    const postfix = to
        .replace(/^\//, '')
        .replace(/index\.html$/, '')
        .replace(/\/$/, '')

    if (prefix) {
        segments.push(prefix)
    }

    if (postfix) {
        segments.push(postfix)
    }

    console.log(segments)

    return segments.join('/') || '/'
}

module.exports = {
    dir,
    loadConfig,
    route,
    workspace,
}
