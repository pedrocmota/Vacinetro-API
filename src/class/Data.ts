import moment from 'moment-timezone'

const formato = 'DD/MM/YYYY HH:mm:ss'
const formato_menor = 'DD/MM/YYYY'

const Data = {

  dataAtual: () => {
    return moment().tz('America/Sao_Paulo').format(formato)
  },

  valido: (data: string) => {
    return moment(data , formato_menor, true).isValid()
  }
}

export default Data