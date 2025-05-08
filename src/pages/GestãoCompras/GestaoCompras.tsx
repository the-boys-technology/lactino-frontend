import './Buy.css';

export default function GestaoCompras() {
  return (
    <div className="compras">
      <header className="compras__header">
        <h1 className="compras__header-title">Compras</h1>
      </header>

      <section className="compras__filters">
        <div className="compras__filter">
          <label className="compras__label">Pedido:</label>
          <input className="compras__input" type="text" />
        </div>
        <div className="compras__filter">
          <label className="compras__label">Tipo de Insumo:</label>
          <input className="compras__input" type="text" />
        </div>
        <div className="compras__filter">
          <label className="compras__label">Produto:</label>
          <input className="compras__input" type="text" />
        </div>
        <div className="compras__filter">
          <label className="compras__label">Fornecedor:</label>
          <input className="compras__input" type="text" />
        </div>
        <div className="compras__filter">
          <label className="compras__label">Período da Compra:</label>
          <input className="compras__input" type="text" />
        </div>
        <div className="compras__filter">
          <label className="compras__label">Faixa de Valor:</label>
          <input className="compras__input" type="text" />
        </div>
      </section>

      <section className="compras__table-container">
        <div className="compras__table-head">
          <span className="compras__th">Pedido</span>
          <span className="compras__th">Tipo</span>
          <span className="compras__th">Produto</span>
          <span className="compras__th">Quantidade</span>
          <span className="compras__th">Fornecedor</span>
          <span className="compras__th">Data</span>
          <span className="compras__th">Total</span>
          <span className="compras__th">Ações</span>
        </div>
        <div className="compras__table-row">
          <span className="compras__td">CMP-0452</span>
          <span className="compras__td">Remédio</span>
          <span className="compras__td">Antibiótico Bovino</span>
          <span className="compras__td">5 frascos</span>
          <span className="compras__td">AgroVet GUS</span>
          <span className="compras__td">02/04/2025</span>
          <span className="compras__td">R$ 175,00</span>
          <button className="compras__button">Ver Relatório</button>
        </div>
      </section>

      <footer className="compras__footer">
        <button className="compras__submit">Registrar Compra</button>
      </footer>
    </div>
  );
}
