import {Express} from 'express'
import rateLimit from 'express-rate-limit'
import delay from 'express-delay'
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import dedent from 'dedent'
import path from 'path'
import fs from 'fs'
import {v4 as uuid} from 'uuid'
import {readJSONAbsolute} from '../utils/utils'

export const Configuration = (app: Express) => {
  const envFile = path.join(process.cwd(), '/.env')
  if(!fs.existsSync(envFile)) {
    createEnvFile()
    console.info(chalk.yellowBright(
      '--> AVISO: Não foi encontrado um arquivo .env, logo ele foi criado por padrão')
    )
  }
  dotenv.config()
  const PORT = process.env.PORT
  const X_POWERED_BY = process.env.X_POWERED_BY
  const CORS = process.env.CORS
  const DEV_DELAY = process.env.DEV_DELAY
  const INFO = process.env.INFO
  const JWT_KEY = process.env.JWT_KEY
  if (!envIsValid(PORT) || !envIsNumer(PORT)) {
    console.error(chalk.red('Porta inválida'))
    process.exit(1)
  }
  if (!envIsValid(DEV_DELAY) || !envIsNumer(DEV_DELAY) || parseInt(DEV_DELAY) < 0) {
    console.error(chalk.red('Delay inválido'))
    process.exit(1)
  } else {
    if (DEV_DELAY != '0') {
      app.use(delay(DEV_DELAY as unknown as number))
      if (INFO == 'true') {
        console.info(chalk.yellowBright(
          `--> AVISO: Delay mínimo de ${DEV_DELAY}ms definido para todas as requests`)
        )
      }
    }
  }
  if (!envIsValid(JWT_KEY) && JWT_KEY.length == 0) {
    console.error(chalk.red('Chave JWT inválida'))
    process.exit(1)
  }
  if (X_POWERED_BY == 'false') {
    app.disable('x-powered-by')
  }
  if (CORS == 'true') {
    app.use(cors())
    if (INFO == 'true') {
      console.info(chalk.yellowBright('--> AVISO: CORS ativo no servidor'))
    }
  }
  setLimits(app)
}

const setLimits = (app: Express) => {
  const file = path.join(process.cwd(), '/.limits.json')
  if (fs.existsSync(file)) {
    const json = readJSONAbsolute(file)
    Object.keys(json).forEach((rota) => {
      const limite = json[rota]
      const time = limite['time']
      const max = limite['max']
      if (envIsValid(time) && envIsNumer(time) && envIsValid(max) && envIsNumer(max)) {
        app.use(rota, rateLimit({
          windowMs: time,
          max: max,
          message: {'erro': 'MUITAS_REQUESTS'}
        }))
      }
    })
  } else {
    if (process.env.INFO == 'true') {
      console.info(chalk.yellowBright('--> AVISO: Não foi possível encontrar o arquivo .limits.json'))
    }
  }
}

const envIsValid = (env: string) => {
  if (env == undefined) return false
  if (env.length == 0) return false
  return true
}

const envIsNumer = (env: string) => {
  return !isNaN(env as unknown as number)
}

const createEnvFile = () => {
  const output = path.join(process.cwd(), '/.env')
  const envText = dedent(`
    PORT=80 
    X_POWERED_BY=false 
    CORS=false 
    DEV_DELAY=0 
    INFO=true 
    JWT_KEY=${uuid()}  
  `)
  fs.writeFileSync(output, envText)
}

export default Configuration