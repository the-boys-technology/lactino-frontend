import { api } from './api'

export const registrarLeite = (dados: any) => api.post('/leites', dados);
export const editarLeite = (id: string, dados: any) => api.put(`/leites/${id}`, dados);
export const removerLeite = (id: string) => api.delete(`/leites/${id}`);
export const buscarLeites = (page: number = 0, size: number = 10) => api.get(`/leites?page=${page}&size=${size}`);
/*
{
  "content": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "nome": "string",
      "descricao": "string",
      "dataObtencao": "2025-06-25",
      "dataValidade": "2025-06-25",
      "origem": "string",
      "turno": "MATUTINO",
      "status": "DISPONIVEL",
      "finalidade": "string",
      "fornecedorId": "string"
    }
  ],
  "page": 1073741824,
  "size": 1073741824,
  "totalElements": 9007199254740991,
  "totalPages": 1073741824,
  "last": true
}
*/
export const buscarLeitePorId = (id: string) => api.get(`/leites/${id}`);

// RESTA /api/leites/vencendo0
// RESTA PATCH /api/leites/{id}

export const registrarLaticinio = (dados: any) => api.post('/laticinios', dados);
export const editarLaticinio = (id: string, dados: any) => api.put(`/laticinios/${id}`, dados);
export const removerLaticinio = (id: string) => api.delete(`/laticinios/${id}`);
export const buscarLaticinios = (page: number = 0, size: number = 10) => api.get(`/laticinios?page=${page}&size=${size}`);
export const buscarLaticinioPorId = (id: string) => api.get(`/laticinios/${id}`);

// RESTA /api/laticinios/vencendo
