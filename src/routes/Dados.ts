import {Router} from 'express'
import {Token} from '../class/Session'
import {Pessoas, Profissionais} from '../class/Dados'
import {APIUtils} from '../utils/utils'

const rota = Router()

rota.get('/pessoas/dados', (req, res) => {
  const id = Token(req.headers.token, res, 'pessoa')?.id
  if(id) {
    res.send(Pessoas.getDados(id))
  }
})

rota.get('/pessoas/foto', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['pessoa'])
  if(parametros) {
    res.type('jpg')
    res.send(Pessoas.getFoto(parametros.pessoa))
  }
})

rota.get('/pessoas/busca', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['cpf'])
  const id = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if(parametros && id) {
    res.send(Pessoas.getDadosCPF(parametros.cpf))
  }
})

rota.get('/profissionais/dados', (req, res) => {
  const id = Token(req.headers.token, res, 'profissional')?.id
  if(id) {
    res.send(Profissionais.getDados(id))
  }
})

rota.get('/profissionais/foto', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['id'])
  if(parametros) {
    res.type('jpg')
    res.send(Profissionais.getFoto(parametros.id))
  }
})

export default rota