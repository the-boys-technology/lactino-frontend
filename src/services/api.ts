import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
})

export const api_ibge = axios.create({
  baseURL: 'http://servicodados.ibge.gov.br/api/v1/localidades',
})

