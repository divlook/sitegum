#!/usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const { Command, Option } = require('commander')
const { glob } = require('glob')
const { version } = require('../package.json')
const env = require('../webpack/env')
const { dir, workspace } = require('../webpack/utils')

/**
 * @param {'dev' | 'build'} cmd
 * @param {*} opt
 */
const execWebpack = (cmd, opt) => {
    const crossEnv = dir('node_modules/.bin/cross-env')
    const webpack = dir('node_modules/.bin/webpack')
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

    args.push(`--config=${dir('webpack.config.js')}`)

    const stream = spawn(args.join(' '), {
        cwd: process.cwd(),
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

program
    .command('init')
    .description('초기 파일 생성')
    .action(async () => {
        try {
            const target = [
                dir('.github/workflows/gh-pages.yml'),
                dir('sitegum.config.json'),
            ]
            const dest = []
            const resultQue = []
            const packageRootPath = path.join(__dirname, '../')

            target.forEach((filename) => {
                if (!fs.existsSync(filename)) {
                    throw new Error(`해당 파일이 존재하지 않습니다. (${filename})`)
                }
            })

            await new Promise((resolve, reject) => {
                glob(dir('*(public|src)/**'), (error, matches) => {
                    if (error) {
                        reject(error)
                        return
                    }

                    matches.forEach((filename) => {
                        if (fs.statSync(filename).isFile()) {
                            target.push(filename)
                        }
                    })
                    resolve()
                })
            })

            target.forEach((filename) => {
                dest.push(path.relative(packageRootPath , filename))
            })

            dest.forEach((filename, index) => {
                const userFile = workspace(filename)
                const packageFile = target[index]
                const dirName = path.parse(userFile).dir

                if (fs.existsSync(userFile)) {
                    let msg = `해당 파일이 이미 존재합니다. (${filename})\n\n`
                    msg += `생성될 파일 목록\n${dest.map(v => `- ${v}`).join('\n')}\n`
                    throw new Error(msg)
                }

                resultQue.push(() => {
                    fs.mkdirSync(dirName, { recursive: true })
                    fs.copyFileSync(packageFile, userFile)
                })
            })

            resultQue.forEach((cb) => cb())
        } catch (reason) {
            console.error(reason)
        }
    })

program.parse()
