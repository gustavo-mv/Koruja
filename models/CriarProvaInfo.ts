import { DisciplinaInfo } from "./DisciplinaInfo";

export interface CriarProvaInfo extends DisciplinaInfo {
  nomeProva?: string;
  assunto?: string;
  nQuestoes?: number;
  nAlternativas?: number;
  nVariações?: number;
}
