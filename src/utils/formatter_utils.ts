export function formatarDinheiro(valor: number | string): string {
  const valorNumber = typeof valor === 'string'
    ? parseFloat(valor.replace(',', '.'))
    : valor

  if (isNaN(valorNumber)) return 'R$ 0,00'

  return valorNumber.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

export function formatarData(dataISO: string): string {
  if (!dataISO) return ''

  const [dataParte] = dataISO.split('T')
  const [ano, mes, dia] = dataParte.split('-')

  return `${dia}/${mes}/${ano}`
}