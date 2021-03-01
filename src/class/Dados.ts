import DB from './DB'
import path from 'path'
import fs from 'fs-extra'
import {IDadosPessoas} from '../types/Dados'

export const Pessoas = {

  existe: (id: string) => {
    const retorno = DB.query(`
    SELECT id from pessoas where id='${id}'
    `) as Array<String>
    return retorno.length > 0
  },

  getNome: (id: string) => {
    const retorno = DB.query(`SELECT nome from pessoas where id='${id}'`)
    return retorno.length > 0 ? retorno[0].nome : undefined
  },

  getFoto: (id: string) => {
    const arquivo = path.join(__dirname, `../database/fotos/${id}.jpg`)
    const desconhecido = path.join(__dirname, '../database/fotos/desconhecido.jpg')
    if(fs.existsSync(arquivo) && Pessoas.existe(id)) {
      return fs.readFileSync(arquivo)
    } else {
      if(fs.existsSync(desconhecido)) return fs.readFileSync(desconhecido)
      return Buffer.alloc(0)
    }
  },

  getDados: (id: string) => {
    const retorno = DB.query(`SELECT 
    id, nome, nascimento, localNascimento, 
    endereco, cidade, uf, comprimento, peso, 
    perimetroEncefalico, tipoParto from pessoas where id='${id}'
    `) as Array<IDadosPessoas>
    const dados = retorno[0]
    return dados
  },

  getDadosCPF: (cpf: string) => {
    const retorno = DB.query(`SELECT id, nome, nascimento FROM
    pessoas where cpf='${cpf}'`) as Array<string>
    const dados = retorno[0]
    return dados || {erro: 'NAO_ENCONTRADO'}
  }
}

export const Profissionais = {

  existe: (id: string) => {
    const retorno = DB.query(`
    SELECT id from profissionais where id='${id}'
    `) as Array<String>
    return retorno.length > 0
  },

  getNome: (id: string) => {
    const retorno = DB.query(`SELECT nome from profissionais where id='${id}'`)
    return retorno.length > 0 ? retorno[0].nome : undefined
  },

  getFoto: (id: string) => {
    const arquivo = path.join(__dirname, `../database/fotos/${id}.jpg`)
    const desconhecido = path.join(__dirname, '../database/fotos/desconhecido.jpg')
    if(fs.existsSync(arquivo)) {
      return fs.readFileSync(arquivo)
    } else {
      if(fs.existsSync(desconhecido)) return fs.readFileSync(desconhecido)
      return Buffer.alloc(0)
    }
  },

  getDados: (id: string) => {
    const retorno = DB.query(`SELECT id, nome, nascimento, cpf, profissao, registro
    from profissionais where id='${id}'`)
    const dados = retorno[0]
    return dados
  }
}