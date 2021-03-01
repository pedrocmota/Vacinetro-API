import {IDoseRetorno} from '../types/Doses'

export interface IDoenca {
  id: string,
  nome: string,
  vacinas?: Array<IVacina>,
  doses_minimas?: number,
  doses?: IDoseRetorno[],
}

export interface IVacina {
  id: string,
  nome: string,
  uso: usoVacina
}

type usoVacina = 'Injetável' | 'Oral'