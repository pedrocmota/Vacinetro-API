import {Router} from 'express';
import {Token} from '../class/Session'
import {APIUtils} from '../utils/utils'
import Vacinas from '../class/Vacinas'
import Doses from '../class/Doses'

const rota = Router()

rota.get('/lista', (req, res) => {
  res.send(Vacinas.pegarListaDoençasVacinas())
})

rota.get('/lista/doenca', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['pessoa', 'doenca'])
  const id = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if (parametros && id) {
    res.send(Doses.pegarTodasPorDoenca(parametros.pessoa, parametros.doenca))
  }
})

rota.get('/lista/profissional', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['pessoa'])
  const profissional = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if (parametros && profissional) {
    res.send(Doses.pegarTodasPorProfissional(parametros.pessoa, profissional))
  }
})

rota.get('/usuario', (req, res) => {
  const id = Token(req.headers.token, res, 'pessoa')?.id
  if (id) {
    res.send(Vacinas.usuario(id))
  }
})

export default rota