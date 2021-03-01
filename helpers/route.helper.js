const { loadConfig } = require('../webpack/utils')

const sitegumConfig = loadConfig()

/**
 * @param {string} to
 */
const route = (to) => {
    const prefix = sitegumConfig.publicPath

    if (!to) {
        return prefix
    }

    const postfix = to
        .replace(/^\//, '')
        .replace(/index\.html$/, '')
        .replace(/\/$/, '')

    return prefix + postfix
}

module.exports = route
