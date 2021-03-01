export interface IDadosPessoas {
  nome: string,
  nascimento: string
  localNascimento: string,
  endereco: string,
  cidade: string,
  uf: string,
  comprimento: number,
  peso: number,
  perimetroEncefalico: number,
  tipoParto: PARTO_TYPES,
}

export type PARTO_TYPES = 'Normal' | 'Cesárea';