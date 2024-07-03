export interface Brand {
    id?: number;
    nome: string;
  }
  
  export interface Model {
    id?: number;
    nome: string;
    marcaId: number;
  }
  
  export interface Location {
    id?: number;
    nome: string;
  }
  
  export interface Device {
    id?: number;
    nome: string;
    macAddress?: string;
    descricao?: string;
    modeloId: number;
    modeloNome: string;
    marcaNome: string;
    localizacaoId: number;
    localizacaoNome?: string;
    marcaId: number;
    ip: string;
    porta?: number;
    url?: string;
    categoriaId: number;
    categoriaNome: string;
    isOnline?: boolean;
  }
  