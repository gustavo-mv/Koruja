export interface disciplinasObj {
  id: string;
  nome: string;
  turmaId: string;
}

export interface TurmaProps {
  id: string;
  nome: string;
  professorId: string;
  disciplinas: disciplinasObj[] | string[] | string;
}
