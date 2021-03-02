'use strict'

const path = require('path')
const { spawn } = require('child_process')
const { Command, Option } = require('commander')
const { version } = require('../package.json')
const env = require('../webpack/env')

/**
 * @param {'dev' | 'build'} cmd
 * @param {*} opt
 */
const execWebpack = (cmd, opt) => {
    const crossEnv = './node_modules/.bin/cross-env'
    const webpack = './node_modules/.bin/webpack'
    const modeByCmd = {
        dev: 'development',
        build: 'production',
    }

    const args = [crossEnv]

    if (opt.mode) {
        args.push(`NODE_ENV=${opt.mode}`)
    } else {
        args.push(`NODE_ENV=${modeByCmd[cmd]}`)
    }

    if (opt.port) {
        args.push(`PORT=${opt.port}`)
    }

    if (opt.publicPath) {
        args.push(`PUBLIC_PATH=${opt.publicPath}`)
    }

    args.push(webpack)

    if (cmd === 'dev') {
        args.push('serve')

        if (opt.open === true) {
            args.push('--open')
        }
    }

    const stream = spawn(args.join(' '), {
        cwd: path.resolve(__dirname, '../'),
        shell: true,
    })

    stream.stdout.on('data', (data) => {
        console.log(data + '')
    })

    stream.stderr.on('data', (data) => {
        console.log(data + '')
    })
}

const program = new Command()

const options = {
    mode: new Option('--mode <env>', 'webpack mode')
        .default(env.mode)
        .choices(['development', 'production']),
    publicPath: new Option('--public-path <path>', '사이트 기본 경로')
        .default(env.publicPath),
}

program.version(version, '-v, --version')

program
    .command('dev')
    .description('개발 서버 실행')
    .addOption(options.mode)
    .option('--open', '브라우져 실행 여부', true)
    .option('-p, --port <port>', 'port', env.port)
    .addOption(options.publicPath)
    .action((opt) => {
        execWebpack('dev', opt)
    })

program
    .command('build')
    .description('html 생성')
    .addOption(options.mode)
    .addOption(options.publicPath)
    .action((opt) => {
        execWebpack('build', opt)
    })

program.parse()
