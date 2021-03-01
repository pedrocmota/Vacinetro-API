export interface IDadosPessoas {
  nome: string,
  nascimento: string,
  localNascimento: string,
  endereco: string,
  cidade: string,
  uf: string,
  comprimento: number,
  peso: number,
  perimetroEncefalico: number,
  tipoParto: 'Normal' | 'Cesárea'
}