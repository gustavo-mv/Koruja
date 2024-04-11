import { DisciplinaInfo } from "./DisciplinaInfo";

export interface CriarProvaInfo {
  turmaId: string;
  nomeProva?: string;
  disciplinaId: string;
  disciplinaNome: string;
  assunto?: string;
  nQuestoes?: number;
  nAlternativas?: number;
  nVariacoes?: number;
  index?: number;
}
