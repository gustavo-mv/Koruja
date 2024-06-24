export default interface User {
  id: string;
  nome: string;
  email: string;
  nIcone: number;
  provasGeradas: number;
  telefone: string;
  telefoneValidado: boolean;
  dataFimAssinatura: any;
  tipo: string;
  cliente: boolean;
  nLimiteProvasFree: number;
}
