export interface IAdicionarDoseParam {
  pessoa: string,
  doenca: string,
  vacina: string,
  data: string,
  lote: string,
  profissional: string,
  localAplicacao: string,
  validadeVacina: string
}

export interface IDose {
  id: string,
  pessoa: string,
  doenca?: string,
  doencaNome?: string,
  vacina: string,
  data: string,
  lote: string,
  profissional: string,
  localAplicacao: string,
  validadeVacina: string,
  estado?: string
}

export interface IDoseRetorno {
  data?: string,
  idProfissional?: string,
  profissional?: string,
  lote?: string,
  localAplicacao?: string,
  validadeVacina?: string
}

export interface IDosePorProfissional {
  nomes: {
    pessoa: string,
    profissional: string
  },
  doses: IDose[]
}