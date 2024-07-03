export interface Software {
  id: number;
  nome: string;
  dataUltimaAtualizacao: string | null;
  ip: string;
  porta?: number;
  url?: string;
}
