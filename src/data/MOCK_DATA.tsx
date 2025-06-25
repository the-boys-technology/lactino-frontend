import { RowData } from './ROW_DATA'; // ajuste o caminho conforme necessário

export const MOCK_DATA: RowData[] = [
  {
    id: '1',
    nome: 'Leite Pasteurizado A',
    descricao: 'Leite integral fresco, coletado na fazenda São Pedro.',
    dataObtencao: '2025-06-10',
    dataValidade: '2025-07-10',
    origem: 'Fazenda São Pedro',
    turno: 'MATUTINO',
    status: 'DISPONIVEL',
    finalidade: 'Consumo humano direto',
    fornecedorId: 'f001'
  },
  {
    id: '2',
    nome: 'Leite Desnatado B',
    descricao: 'Leite desnatado para processamento em derivados.',
    dataObtencao: '2025-05-28',
    dataValidade: '2025-06-28',
    origem: 'Cooperativa Vale Verde',
    turno: 'VESPERTINO',
    status: 'UTILIZADO',
    finalidade: 'Produção de iogurte',
    fornecedorId: 'f002'
  },
  {
    id: '3',
    nome: 'Leite Integral C',
    descricao: 'Lote destinado à alimentação escolar.',
    dataObtencao: '2025-04-15',
    dataValidade: '2025-05-15',
    origem: 'Fazenda Boa Esperança',
    turno: 'NOTURNO',
    status: 'VENCIDO',
    finalidade: 'Distribuição em escolas públicas',
    fornecedorId: 'f003'
  },
  {
    id: '4',
    nome: 'Leite Pasteurizado D',
    descricao: 'Produto com alteração de cor e cheiro.',
    dataObtencao: '2025-06-01',
    dataValidade: '2025-06-20',
    origem: 'Fazenda Santa Clara',
    turno: 'MATUTINO',
    status: 'DESCARTADO',
    finalidade: 'Não aplicável',
    fornecedorId: 'f004'
  },
  {
    id: '5',
    nome: 'Leite Enriquecido E',
    descricao: 'Leite fortificado com vitaminas para programas sociais.',
    dataObtencao: '2025-06-12',
    dataValidade: '2025-07-12',
    origem: 'Laticínios Novo Horizonte',
    turno: 'VESPERTINO',
    status: 'DISPONIVEL',
    finalidade: 'Suplementação alimentar infantil',
    fornecedorId: 'f005'
  }
];
