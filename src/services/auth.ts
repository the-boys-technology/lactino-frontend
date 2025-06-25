import { api } from './api';


// CADASTRO E LOGIN
export const cadastrarConta = (dados: any) => api.post('/auth/registrar', dados);
export const fazerLogin = (dados: any) => api.post('/auth/login', dados);

// VISUALIZAÇÃO E EDIÇÃO DE PERFIL
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

//
export const mudarSenha = (dados: any) => api.post('/auth/mudar-senha', dados);
/*
{
  "senhaAtual": "string",
  "novaSenha": "^tW)j(Qt_Q*fG5Vhk\\HUj>itE3+((R^&5[o-s69NrL(Y6CQF#QY+p.Qi",
  "confirmarNovaSenha": ",-$uc~/dPdRj*xAETU= dn/sPg d#Z@},92"
}
*/
export const solicitarRedefinirSenhaApi = (email: string) => api.post('/auth/solicitar-redefinicao-senha', { email} );
export const redefinirSenhaApi = (dados: any) => api.post('/auth/redefinir-senha', dados);
/*
{
  "email": "string",
  "codigo": "string",
  "novaSenha": "DC?fQYYmu#trE*,uQY-Z3CQ>pKC4}<SE=q0~okPbhikQ-J+Wk!Vuf$^BHei"
}
*/