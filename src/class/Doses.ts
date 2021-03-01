import {v4 as uuidv4} from 'uuid'
import DB from '../class/DB'
import Vacinas from './Vacinas'
import Data from './Data'
import {Pessoas, Profissionais} from './Dados'
import {IAdicionarDoseParam, IDose, IDosePorProfissional} from '../types/Doses'

const Doses = {

  pegarTodas: (pessoa: string) => {
    const retorno = DB.query(`SELECT * from doses 
    where pessoa='${pessoa}' and estado='ATIVO'`) as Array<IDose>
    return retorno
  },

  pegarTodasPorDoenca: (pessoa: string, doenca: string) => {
    const retorno = DB.query(`SELECT id, doenca, vacina, data, estado from doses 
    where pessoa='${pessoa}' and doenca='${doenca}' 
    order by doenca, datetime(data)`) as Array<IDose>
    retorno.forEach(vacina => {
      vacina.vacina = Vacinas.pegarNomeVacinaPorID(vacina.vacina)
    })
    return retorno
  },

  pegarTodasPorProfissional: (pessoa: string, profissinal: string) => {
    const pessoaNome = Pessoas.getNome(pessoa)
    const profissionalNome = Profissionais.getNome(profissinal)
    if (pessoaNome == undefined) return {erro: 'PESSOA_DESCONHECIDA'}
    if (profissionalNome == undefined) return {erro: 'PROFISSIONAL_DESCONHECIDA'}
    const doses = DB.query(`SELECT id, doenca, vacina, data, lote, localAplicacao, validadeVacina, estado from doses 
    where pessoa='${pessoa}' and profissional='${profissinal}' order by doenca, datetime(data)`) as Array<IDose>
    doses.forEach(vacina => {
      vacina.vacina = Vacinas.pegarNomeVacinaPorID(vacina.vacina as string)
      vacina.doencaNome = Vacinas.pegarNomeDoencaPorID(vacina.doenca as string)
    })
    const retorno: IDosePorProfissional = {
      nomes: {
        pessoa: pessoaNome,
        profissional: profissionalNome
      },
      doses: doses
    }
    return retorno
  },

  pegarNumeroDoses: (pessoa: string, doenca: string) => {
    const doses = Doses.pegarTodasPorDoenca(pessoa, doenca)
    const dosesValidas = doses.filter(element => element.estado === 'ATIVO')
    if (dosesValidas.length == 0) return 0
    return dosesValidas.length
  },

  adicionar: async (profissional: string, parametros: IAdicionarDoseParam) => {
    if (!Pessoas.existe(parametros.pessoa)) return {erro: 'USUARIO_INVALIDO'}
    const doenças = Vacinas.pegarListaDoenças()
    const doença = doenças.find(element => element.id == parametros.doenca)
    if (!doença) return {erro: 'DOENÇA_INVALIDA'}
    const vacinas = Vacinas.pegarListaVacinas()
    const vacina = vacinas.find(element => element.id == parametros.vacina)
    if (!vacina) return {erro: 'VACINA_INVALIDA'}
    if (!Data.valido(parametros.validadeVacina)) return {erro: 'DATA_INVALIDA'}
    if (parametros.lote.length <= 0 && parametros.lote.length > 50) return {erro: 'LOTE_INVALIDO'}
    if (parametros.localAplicacao.length <= 0 && parametros.localAplicacao.length > 500) return {erro: 'LOCAL_INVALIDO'}
    const id = uuidv4()
    const data = Data.dataAtual()
    const sql = `
    INSERT INTO doses (
      id, pessoa, doenca, 
      vacina, data, 
      lote,  profissional, 
      localAplicacao, validadeVacina
    )
    VALUES (
      '${id}', 
      '${parametros.pessoa}',
      '${parametros.doenca}',
      '${parametros.vacina}',
      '${data}',
      '${parametros.lote}',
      '${profissional}',
      '${parametros.localAplicacao}',
      '${parametros.validadeVacina}'
    )`
    DB.query(sql)
    return {retorno: 'OK'}
  },

  inativar: (pessoa: string, profissional: string, idDose: string) => {
    const todas = (Doses.pegarTodasPorProfissional(pessoa, profissional) as IDosePorProfissional)
    if (todas.doses.length == 0) return {erro: 'PESSOA_DESCONHECIDA_OU_SEM_VACINACAO'}
    const dose = todas.doses.find(element => element.id == idDose)
    if (dose?.estado) {
      if (dose.estado == 'INATIVO') return {erro: 'DOSE_JA_ESTA_INATIVA'}
      DB.query(`UPDATE doses SET estado='INATIVO' WHERE id='${idDose}'`)
      return {retorno: 'OK'}
    } else {
      return {erro: 'DOSE_INVALIDA'}
    }
  },

  ativar: (pessoa: string, profissional: string, idDose: string) => {
    const todas = (Doses.pegarTodasPorProfissional(pessoa, profissional) as IDosePorProfissional)
    if (todas.doses.length == 0) return {erro: 'PESSOA_DESCONHECIDA_OU_SEM_VACINACAO'}
    const dose = todas.doses.find(element => element.id == idDose)
    if (dose?.estado) {
      if (dose.estado == 'ATIVO') return {erro: 'DOSE_JA_ESTA_ATIVA'}
      DB.query(`UPDATE doses SET estado='ATIVO' WHERE id='${idDose}'`)
      return {retorno: 'OK'}
    } else {
      return {erro: 'DOSE_INVALIDA'}
    }
  }
}

export default Doses