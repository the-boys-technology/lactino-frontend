export function formatarData(dataISO: string): string {
  if (!dataISO) return ''
  
  const [ano, mes, dia] = dataISO.split('-')
  return `${dia}/${mes}/${ano}`
}
