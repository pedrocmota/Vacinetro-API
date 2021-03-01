import {Request, Response} from 'express'
import path from 'path'
import fs from 'fs'

export const APIUtils = {
  validatePost: (req: Request, res: Response, parametros: String[]) => {
    const recebido = req.body
    const keys = Object.keys(recebido)
    const valido = JSON.stringify(keys) == JSON.stringify(parametros)
    if (!valido) {
      if(!res.headersSent) res.sendStatus(400)
      return null
    }
    return safe(recebido)
  },

  validateGet: (req: Request, res: Response, parametros: String[]) => {
    const recebido = req.query
    const keys = Object.keys(recebido)
    const valido = JSON.stringify(keys) == JSON.stringify(parametros)
    if (!valido) {
      if(!res.headersSent) res.sendStatus(400)
      return null
    }
    return safe(recebido)
  }
}

export const safe = (unsafe: any) => {
  let safed:any = {}
  Object.keys(unsafe).forEach((value:string) => {
    const str:string = unsafe[value]
    const removedTags = str.replace(/(<([^>]+)>)/gi, '')
    const removedQuotes = removedTags.replace(/'/g, '\'\'')
    safed[value] = removedQuotes
  })
  return safed
}

export const readJSON = (caminho: string) => {
  const file = path.join(__dirname, caminho)
  return JSON.parse(fs.readFileSync(file).toString())
}

export const readJSONAbsolute = (caminho: string) => {
  return JSON.parse(fs.readFileSync(caminho).toString())
}
