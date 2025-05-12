import { useState } from "react";
import ModalCompra from "../../features/GestãoCompras/ModalCompras/ModalCompras";
import Campo from "../../components/Campo";
import Botao from "../../components/Botao";
import "../GestaoCompras/GestaoCompras.css";

export default function GestaoCompras() {
  const [modalAberto, setModalAberto] = useState(false);
  const [compras, setCompras] = useState<any[]>([]);

  const handleNovaCompra = (compra: any) => {
    setCompras([...compras, compra]);
  };

  return (
    <div className="compras">
      <header className="compras__header">
        <h1 className="compras__header-title">Compras</h1>
      </header>

      {/* Filtros (campos de busca) */}
      <section className="compras__filtros">
        <div className="compras__linha">
          <Campo type="text" placeholder="Fornecedor" />
          <Campo type="text" placeholder="Tipo de Insumo" />
          <Campo type="text" placeholder="Produto" />
        </div>
        <div className="compras__linha">
          <Campo type="date" placeholder="Período da Compra" />
          <Campo type="number" placeholder="Faixa de Valor" />
        </div>
      </section>

      {/* Tabela de compras */}
      <section className="compras__tabela">
        <div className="compras__tabela-cabecalho">
                    <span className="compras__coluna">Fornecedor</span>
          <span className="compras__coluna">Tipo</span>
          <span className="compras__coluna">Produto</span>
          <span className="compras__coluna">Quantidade</span>
          <span className="compras__coluna">Data</span>
          <span className="compras__coluna">Total</span>
          <span className="compras__coluna">Ações</span>
        </div>
        {compras.map((item, index) => (
          <div key={index} className="compras__tabela-linha">
            <span className="compras__coluna-dado">{item.fornecedor}</span>
            <span className="compras__coluna-dado">{item.tipoInsumo}</span>
            <span className="compras__coluna-dado">{item.produto}</span>
            <span className="compras__coluna-dado">{item.quantidade}</span>
            <span className="compras__coluna-dado">{item.dataCompra}</span>
            <span className="compras__coluna-dado">{item.valorTotal}</span>
            <span className="compras__coluna-dado">
              <button className="compras__ver-relatorio">🔍 Ver Relatório</button>
            </span>
          </div>
        ))}
      </section>

      {/* Botão para abrir modal */}
      <footer className="compras__footer">
        <Botao tipo="primary" label="Registrar Compra" onClick={() => setModalAberto(true)} />
      </footer>

      {modalAberto && (
        <ModalCompra
          onClose={() => setModalAberto(false)}
          onSave={handleNovaCompra}
        />
      )}
    </div>
  );
}
