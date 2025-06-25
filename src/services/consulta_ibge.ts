import { api_ibge } from "./api"

export const consultarEstadoEId = () => api_ibge.get('/estados');
export const consultarMunicipios = (idEstado: number) => api_ibge.get(`/estados/${idEstado}/municipios`)
export const consultarCEP = (cep: string) => api_ibge.get(`https://viacep.com.br/ws/${cep}/json/`)

//export const consultarCEP = (cep: string) => api_ibge.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
