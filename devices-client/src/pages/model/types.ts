export interface Model {
  id?: number;
  nome: string;
  marcaId: number;
  marcaNome?: string; // Adicional para exibição na tabela
}