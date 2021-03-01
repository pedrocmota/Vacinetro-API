export interface IPessoaParam {
  cpf: string,
  nomePai: string,
  nomeMae: string
}

export interface IPessoa {
  id: string,
  nome: string,
  cpf: string,
  nomeMae: string,
  nomePai: string
}

export interface IProfissionalParam {
  cpf: string,
  senha: string
}

export interface IProfissional {
  id: string,
  cpf: string,
  senha: string
}