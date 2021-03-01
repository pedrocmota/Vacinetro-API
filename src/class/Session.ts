import {Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import DB from './DB'
import {Pessoas, Profissionais} from './Dados'
import {IJWT, userTypes,} from '../types/Session'
import {IPessoaParam, IPessoa, IProfissionalParam, IProfissional} from '../types/Login'

export const Token = (token: string, res: Response, tipo: userTypes): IJWT | null => {
  try {
    const tokenObj = jwt.verify(token, process.env.JWT_KEY) as IJWT
    const tipoObj = tokenObj.tipo
    if(tipo != tipoObj) {
      if(!res.headersSent) res.send({tokenErro: 'FORMATO_TOKEN_INVALIDO'})
      return null
    }
    if(tipoObj == 'pessoa' && !Pessoas.existe(tokenObj.id)) {
      if(!res.headersSent) res.send({tokenErro: 'USUARIO_DESCONHECIDO'})
      return null
    }
    if(tipoObj == 'profissional' && !Profissionais.existe(tokenObj.id)) {
      res.send({tokenErro: 'USUARIO_DESCONHECIDO'})
      return null
    }
    return tokenObj
  } catch {
    if(!res.headersSent) res.send({tokenErro: 'TOKEN_INVALIDO'})
    return null
  }
}

export const Pessoa = {
  createToken: (parametros: IPessoaParam) => {
    const returnUser: Array<IPessoa> = DB.query(`SELECT id FROM pessoas where 
      cpf='${parametros.cpf}' and 
      nomePai='${parametros.nomePai}' and 
      nomeMae='${parametros.nomeMae}'`)
    if (returnUser.length > 0) {
      const user: IPessoa = returnUser[0]
      const token = jwt.sign({
        id: user.id,
        tipo: 'pessoa'
      }, process.env.JWT_KEY)
      return {token: token}
    } else {
      return {erro: 'NAO_ENCONTRADO'}
    }
  }
}

export const Profissional = {
  createToken: (parametros: IProfissionalParam) => {
    const returnUser: Array<IProfissional> = DB.query(`SELECT id, senha FROM profissionais where 
      cpf='${parametros.cpf}'`)
    if (returnUser.length > 0) {
      const user: IProfissional = returnUser[0]
      const senhaValida = bcrypt.compareSync(parametros.senha, user.senha)
      if(senhaValida) {
        const token = jwt.sign({
          id: user.id,
          tipo: 'profissional'
        }, process.env.JWT_KEY)
        return {token: token}
      }
      return {erro: 'SENHA_INCORRETA'}
    } else {
      return {erro: 'NAO_ENCONTRADO'}
    }
  }
}