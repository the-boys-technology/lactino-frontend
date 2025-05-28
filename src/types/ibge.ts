export interface EstadoRaw {
  id: number;
  sigla: string;
  nome: string;
}

export interface MunicipioRaw {
  id: number;
  nome: string;
}

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}
export interface EstadoComMunicipios extends Estado {
  municipios: string[];      
}