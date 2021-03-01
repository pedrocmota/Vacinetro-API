export interface IJWT {
  id: string,
  tipo: userTypes
}

export type userTypes = 'pessoa' | 'profissional';