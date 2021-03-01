import {Router} from 'express';
import {APIUtils} from '../utils/utils'
import {Pessoa, Profissional} from '../class/Session'

const rota = Router()

rota.post('/pessoas/login', (req, res) => {
  const parametros = APIUtils.validatePost(req, res, ['cpf', 'nomePai', 'nomeMae'])
  if(parametros) {
    res.send(Pessoa.createToken(parametros))
  }
})

rota.post('/profissionais/login', (req, res) => {
  const parametros = APIUtils.validatePost(req, res, ['cpf', 'senha'])
  if(parametros) {
    res.send(Profissional.createToken(parametros))
  }
})

export default rota