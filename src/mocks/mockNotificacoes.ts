import { Notificacao } from "../types/notificacao";

export const mockNotificacoes: Notificacao[] = [
  {
    id: "1",
    titulo: "Insumo abaixo do estoque mínimo",
    mensagem: "A Ração Tipo A está com apenas 2kg, abaixo do mínimo de 5kg.",
    tipo: "INSUMO",
    referencia_id: 7,
    referencia_tipo: "INSUMO",
    usuario_id: 15,
    data_criacao: "2025-06-03T06:00:00",
    lida: false,
  },
  {
    id: "2",
    titulo: "Leite vencendo em 1 dia",
    mensagem: "O lote 2025-001 do leite integral vence amanhã.",
    tipo: "LEITE",
    referencia_id: 12,
    referencia_tipo: "LEITE",
    usuario_id: 15,
    data_criacao: "2025-06-10T06:00:00",
    lida: false,
  },
  {
    id: "3",
    titulo: "Laticínio prestes a vencer",
    mensagem: "Queijo Minas frescal vence hoje.",
    tipo: "LATICINIO",
    referencia_id: 21,
    referencia_tipo: "LATICINIO",
    usuario_id: 15,
    data_criacao: "2025-06-11T06:00:00",
    lida: false,
  },
];
