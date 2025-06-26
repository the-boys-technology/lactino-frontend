import "../css/relatorio-pedido.css";
import Botao from "./Botao";
import { Transacao } from "../types/transacao";
import { Cliente } from "../types/cliente";
import { Fornecedor } from "../types/fornecedor";

// As props agora recebem o objeto 'transacao' completo
interface Props {
  transacao: Transacao;
  clientes?: Cliente[];
  fornecedores?: Fornecedor[]; // Adicionado para consistência, caso use em compras
  onClose: () => void;
}

export default function RelatorioPedido({ transacao, clientes = [], fornecedores = [], onClose }: Props) {
  // REMOVEMOS toda a lógica de useState e useEffect para buscar dados.
  
  const imprimir = () => window.print();

  const getPessoaNome = () => {
    if (transacao.tipo === "VENDA") {
      return clientes.find(c => c.id === transacao.clienteId)?.nome || "Não identificado";
    }
    if (transacao.tipo === "COMPRA") {
      return fornecedores.find(f => f.id === transacao.fornecedorId)?.nome || "Não identificado";
    }
    return "";
  };
  const pessoaLabel = transacao.tipo === 'VENDA' ? 'Cliente' : 'Fornecedor';

  return (
    <div className="relatorio-pedido__fundo" onClick={onClose}>
      <div className="relatorio-pedido__container" onClick={(e) => e.stopPropagation()}>
        <h2 id="relatorio-title">Relatório de Pedido</h2>

        <section className="relatorio-pedido__dados">
          <p><strong>Data:</strong> {new Date(transacao.data).toLocaleDateString()}</p>
          <p><strong>{pessoaLabel}:</strong> {getPessoaNome()}</p>
          <p><strong>Pagamento:</strong> {transacao.formaPagamento}</p>
          {transacao.descricao && (<p><strong>Descrição:</strong> {transacao.descricao}</p>)}
        </section>

        <table className="relatorio-pedido__tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {transacao.itens.map((item, i) => (
              <tr key={item.id || i}>
                <td>{item.nome || `Produto ID: ${item.produtoId}`}</td>
                <td>{item.quantidade}</td>
                <td>R$ {(item.precoUnitario || 0).toFixed(2)}</td>
                <td>R$ {((item.quantidade || 0) * (item.precoUnitario || 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="relatorio-pedido__total">
          <strong>Total do Pedido:</strong> R$ {(transacao.valorTotal || 0).toFixed(2)}
        </p>

        <div className="relatorio-pedido__botoes">
          <Botao tipo="secondary" label="Fechar" htmlType="button" onClick={onClose} />
          <Botao tipo="primary" label="🖨️ Imprimir" htmlType="button" onClick={imprimir} />
        </div>
      </div>
    </div>
  );
}


// import { useEffect, useState } from "react";
// import "../css/relatorio-pedido.css";
// import Botao from "./Botao";
// import { RelatorioPedidoTipo } from "../types/relatorios";
// import {
//   baixarRelatorioPDF,
//   buscarRelatorioPedido,
// } from "../services/relatorio";

// interface Props {
//   transacaoId: string;
//   onClose: () => void;
// }

// export default function RelatorioPedido({ transacaoId, onClose }: Props) {
//   const [relatorio, setRelatorio] = useState<RelatorioPedidoTipo | null>(null);
//   const [carregandoPDF, setCarregandoPDF] = useState(false);
//   const [spinner, setSpinner] = useState(true);
//   const [toast, setToast] = useState("");

//   useEffect(() => {
//     if (!transacaoId) return;
//     buscarRelatorioPedido(transacaoId)
//       .then((r) => setRelatorio(r))
//       .catch(() => setToast("❌ Erro ao carregar relatório."))
//       .finally(() => setSpinner(false));
//   }, [transacaoId]);

//   const imprimir = () => window.print();

//   const exportarPDF = async () => {
//     setCarregandoPDF(true);
//     try {
//       await baixarRelatorioPDF(transacaoId);
//       setToast("✅ PDF exportado com sucesso!");
//     } catch {
//       setToast("❌ Falha ao exportar PDF.");
//     } finally {
//       setCarregandoPDF(false);
//       setTimeout(() => setToast(""), 3000);
//     }
//   };

//   if (spinner) {
//     return (
//       <div className="relatorio-pedido__fundo" onClick={onClose}>
//         <div className="relatorio-pedido__container">
//           <p>Carregando relatório…</p>
//         </div>
//       </div>
//     );
//   }

//   if (!relatorio) {
//     return (
//       <div className="relatorio-pedido__fundo" onClick={onClose}>
//         <div className="relatorio-pedido__container">
//           <p>Relatório indisponível.</p>
//           <Botao
//             tipo="primary"
//             label="Fechar"
//             htmlType="button"
//             onClick={onClose}
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relatorio-pedido__fundo" onClick={onClose}>
//       <div
//         className="relatorio-pedido__container"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="relatorio-title"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 id="relatorio-title">Relatório de Pedido</h2>

//         <section className="relatorio-pedido__dados">
//           <p><strong>Data:</strong> {new Date(relatorio.data).toLocaleDateString()}</p>
          
//           {relatorio.tipo === "VENDA" && relatorio.clienteNome && (
//             <p><strong>Cliente:</strong> {relatorio.clienteNome}</p>
//           )}
//           {relatorio.tipo === "COMPRA" && relatorio.fornecedorNome && (
//             <p><strong>Fornecedor:</strong> {relatorio.fornecedorNome}</p>
//           )}

//           <p><strong>Pagamento:</strong> {relatorio.formaPagamento}</p>
          
//           {relatorio.descricao && (
//             <p><strong>Descrição:</strong> {relatorio.descricao}</p>
//           )}
//         </section>

//         <table className="relatorio-pedido__tabela">
//           <thead>
//             <tr>
//               <th>Produto</th>
//               <th>Qtd</th>
//               <th>Valor Unit.</th>
//               <th>Subtotal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {relatorio.itens.map((item, i) => (
//               <tr key={item.nome + "-" + i}>
//                 <td>{item.nome}</td>
//                 <td>{item.quantidade}</td>
//                 <td>R$ {item.precoUnitario.toFixed(2)}</td>
//                 <td>R$ {item.subtotal.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <p className="relatorio-pedido__total">
//           <strong>Total do Pedido:</strong> R$ {relatorio.valorTotal.toFixed(2)}
//         </p>

//         <div className="relatorio-pedido__botoes">
//           <Botao
//             tipo="secondary"
//             label="Cancelar"
//             htmlType="button"
//             onClick={onClose}
//           />
//           <Botao
//             tipo="primary"
//             label={carregandoPDF ? "Exportando…" : "📄 Exportar PDF"}
//             htmlType="button"
//             onClick={exportarPDF}
//           />
//           <Botao
//             tipo="primary"
//             label="🖨️ Imprimir"
//             htmlType="button"
//             onClick={imprimir}
//           />
//         </div>

//         {toast && <div className="relatorio-pedido__toast">{toast}</div>}
//       </div>
//     </div>
//   );
// }
