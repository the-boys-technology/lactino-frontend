import { api_ibge } from "./api"

export const consultarEstadoEId = () => api_ibge.get('/estados');
export const consultarMunicipios = (idEstado: number) => api_ibge.get(`/estados/${idEstado}/municipios`)