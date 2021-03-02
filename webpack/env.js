/**
 * @type {'development' | 'production'}
 */
exports.mode = process.env.NODE_ENV || 'development'

/**
 * @type {number}
 */
exports.port = process.env.PORT || 3000

/**
 * @type {string}
 */
exports.publicPath = process.env.PUBLIC_PATH || '/'
