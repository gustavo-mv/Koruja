import { DisciplinasObj } from "@/models/DisciplinasObj";

export interface TurmaProps {
  id: string;
  nome: string;
  professorId: string;
  disciplinas: DisciplinasObj[];
}
