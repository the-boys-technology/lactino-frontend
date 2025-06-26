import { useEffect } from 'react';
import { useNotificacoes } from '../context/NotificacoesContext';
import { buscarInsumos } from '../services/estoque';
import { gerarNotificacoesDeValidade } from '../utils/notificações_utils';

// Este componente não renderiza nada, apenas executa a lógica de notificação.
export default function GerenciadorDeNotificacoes() {
  const { setNotificacoes } = useNotificacoes();

  useEffect(() => {
    async function buscarProdutosEGerarNotificacoes() {
      try {
        // Por enquanto, buscamos apenas os Insumos que sabemos ter 'validade'
        const resInsumos = await buscarInsumos();
        
        const insumos = resInsumos.data.content || [];

        // Gera notificações para cada tipo de produto usando nosso utilitário
        const notificacoesInsumo = gerarNotificacoesDeValidade(insumos, 'INSUMO');
        
        // Se Leite e Laticínio tiverem validade, as chamadas seriam adicionadas aqui
        // const notificacoesLeite = ...
        // const notificacoesLaticinio = ...

        // Junta todas as notificações em uma única lista
        const todasAsNotificacoes = [...notificacoesInsumo];

        // Ordena as notificações, por exemplo, por urgência (vencidos primeiro)
        todasAsNotificacoes.sort((a, b) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());

        // Atualiza o estado global de notificações de uma só vez
        setNotificacoes(todasAsNotificacoes);

      } catch (error) {
        console.error("Falha ao gerar notificações centralizadas:", error);
      }
    }

    // Roda a verificação um pouco depois do app carregar para não atrapalhar a renderização inicial
    const timer = setTimeout(() => {
        buscarProdutosEGerarNotificacoes();
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado

  }, [setNotificacoes]);

  return null; // Este componente não renderiza nada visualmente
}