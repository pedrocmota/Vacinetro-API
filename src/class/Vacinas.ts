import Doses from './Doses'
import {Profissionais} from '../class/Dados'
import {readJSON} from '../utils/utils'
import {IDoenca, IVacina} from '../types/Vacinas'
import {IDoseRetorno} from '../types/Doses'

const Vacinas = {

  pegarListaDoenças: () => {
    const json:IDoenca[] = readJSON('../database/vacinas.json')
    json.forEach(element => {
      delete element.vacinas
    });
    return json
  },

  pegarListaDoençasVacinas: () => {
    return readJSON('../database/vacinas.json') as IDoenca[]
  },

  pegarListaVacinas: () => {
    let vacinas:Array<IVacina> = []
    const lista = Vacinas.pegarListaDoençasVacinas()
    lista.forEach(element => {
      delete element.doses_minimas
    })
    lista.forEach((doenca) => {
      doenca.vacinas?.forEach((vacina) => {
        vacinas.push({
          id: vacina.id,
          nome: vacina.nome,
          uso: vacina.uso
        })
      })
    })
    return vacinas
  },
  
  pegarNomeDoencaPorID: (id: string) => {
    const json:Array<IDoenca> = readJSON('../database/vacinas.json')
    let nome = 'null'
    json.forEach(doenca => {
      if(doenca.id == id) nome = doenca.nome
    })
    return nome
  },

  pegarNomeVacinaPorID: (id: string) => {
    const json:Array<IDoenca> = readJSON('../database/vacinas.json')
    let nome = 'null'
    json.forEach(doenca => {
      doenca.vacinas?.forEach(vacina => {
        if(vacina.id == id) nome = vacina.nome
      })
    });
    return nome
  },

  usuario: (id: string) => {
    const retorno = Vacinas.pegarListaDoenças()
    const dosesTomadasUsuario = Doses.pegarTodas(id)
    retorno.forEach(doenca => {
      const dosesTomadas = dosesTomadasUsuario.filter(element => element.doenca == doenca.id)
      const doseRetorno:IDoseRetorno[] = []
      dosesTomadas.forEach(dose => {
        doseRetorno.push({
          data: dose.data,
          profissional: Profissionais.getNome(dose.profissional),
          lote: dose.lote,
          localAplicacao: dose.localAplicacao,
          validadeVacina: dose.validadeVacina
        })
      });
      doenca.doses = doseRetorno
    });
    return retorno
  }
}

export default Vacinas