import { v4 as uuidv4 } from 'uuid';
import { Notificacao, TipoNotificacao } from '../types/notificacao';

// Interface genérica para qualquer item que tenha validade
interface ItemComValidade {
  id: string;
  nome: string;
  validade: string; // Formato esperado: "AAAA-MM-DD"
}

// Limite de dias para começar a notificar sobre a proximidade do vencimento
const DIAS_LIMITE_PARA_NOTIFICAR = 7;

export function gerarNotificacoesDeValidade(
  itens: ItemComValidade[],
  tipo: TipoNotificacao
): Notificacao[] {
  if (!itens || itens.length === 0) {
    return [];
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas as datas

  const notificacoes: Notificacao[] = [];

  for (const item of itens) {
    if (!item.validade) continue; // Pula itens sem data de validade

    const dataValidade = new Date(item.validade + "T00:00:00");
    const diffTime = dataValidade.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let titulo = '';
    
    // Lógica para VENCIDO
    if (diffDays < 0) {
      titulo = `🚨 ${tipo} VENCIDO!`;
    } 
    // Lógica para VENCE HOJE
    else if (diffDays === 0) {
      titulo = `⚠️ ${tipo} VENCE HOJE!`;
    } 
    // Lógica para PRÓXIMO DE VENCER
    else if (diffDays <= DIAS_LIMITE_PARA_NOTIFICAR) {
      titulo = `🔔 ${tipo} vence em ${diffDays} dia(s)`;
    }

    // Se um título foi gerado, cria o objeto de notificação
    if (titulo) {
      const dataFormatada = new Intl.DateTimeFormat('pt-BR').format(dataValidade);
      notificacoes.push({
        id: uuidv4(),
        titulo,
        mensagem: `${item.nome} (Validade: ${dataFormatada})`,
        tipo: tipo,
        referencia_id: parseInt(item.id, 10), // Supondo que referencia_id seja number
        referencia_tipo: tipo,
        data_criacao: new Date().toISOString(),
        lida: false,
        usuario_id: 1, // Mock
      });
    }
  }

  return notificacoes;
}