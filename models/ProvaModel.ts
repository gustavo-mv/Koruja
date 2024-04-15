export interface Variacao {
  id: string;
  modelo: number;
  provaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProvaModel {
  id: string;
  nome: string;
  assunto: string;
  nQuestoes: number;
  nAlternativas: number;
  nVariacoes: number;
  disciplinaId: string;
  createdAt: Date;
  updatedAt: Date;
  variacoes: Variacao[];
  disciplina: {
    nome: string;
  };
}
