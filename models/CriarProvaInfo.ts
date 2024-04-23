export interface Resposta {
  questoes: {
    create: {
      numero: number;
      resposta: string;
    }[];
  };
}

export interface CriarProvaInfo {
  turmaId: string;
  nomeProva?: string;
  disciplinaId: string;
  disciplinaNome: string;
  respostas?: any;
  assunto?: string;
  nQuestoes?: number;
  nAlternativas?: number;
  nVariacoes?: number;
  index?: number;
}
