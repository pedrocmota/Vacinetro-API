import {Router} from 'express'
import {Token} from '../class/Session'
import {APIUtils} from '../utils/utils'
import Doses from '../class/Doses'

const rota = Router()

rota.post('/adicionar', async (req, res) => {
  const parametros = APIUtils.validatePost(req, res, 
    ['pessoa', 'doenca', 'vacina','lote', 
    'localAplicacao', 'validadeVacina'
    ])
  const id = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if(parametros && id) {
    res.send(await Doses.adicionar(id, parametros))
  }
})

rota.get('/numero', (req, res) => {
  const parametros = APIUtils.validateGet(req, res, ['pessoa', 'doenca'])
  const id = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if(id) {
    res.send({
      numero: Doses.pegarNumeroDoses(parametros.pessoa, parametros.doenca)
    })
  }
})

rota.post('/inativar', async (req, res) => {
  const parametros = APIUtils.validatePost(req, res, ['pessoa', 'dose'])
  const profissional = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if(parametros && profissional) {
    res.send(Doses.inativar(parametros.pessoa, profissional, parametros.dose))
  }
})

rota.post('/ativar', async (req, res) => {
  const parametros = APIUtils.validatePost(req, res, ['pessoa', 'dose'])
  const profissional = parametros ? Token(req.headers.token, res, 'profissional')?.id : undefined
  if(parametros && profissional) {
    res.send(Doses.ativar(parametros.pessoa, profissional, parametros.dose))
  }
})

export default rota