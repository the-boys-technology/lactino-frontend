import { api } from './api';

export const cadastrarConta = (dados: any) => api.post('/auth/registrar', dados);
export const fazerLogin = (dados: any) => api.post('/auth/login', dados);
export const verDados = () => api.get('/auth/ver-dados');
export const editarDados = (dados: any) => api.put('/auth/editar-dados', dados);

/* EDITAR DADOS
{
  "nome": "string",
  "fotoPerfil": "string",
  "cep": "string",
  "cidade": "string",
  "estado": "string",
  "rua": "string",
  "bairro": "string"
}
*/