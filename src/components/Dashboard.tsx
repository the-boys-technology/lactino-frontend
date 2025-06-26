import { useEffect, useState } from 'react';
import Header from './Header'
import Card from './Card'
import '../css/dashboard.css'
import Botao from '../components/Botao'
import PopupVigilancia from '../features/Home/PopUpVigilancia/PopupVigilancia'
import { useNavigate } from 'react-router-dom';
import { Fornecedor } from '../types/fornecedor'
import GraficoInsumos from '../components/GraficoInsumos';
import { getEstoqueResumo, getUltimasCompras, getUltimasVendas } from '../services/dashboard';
import ModalFornecedor from '../features/Home/ModalFornecedor/ModalFornecedor'

export default function Dashboard() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showModalFornecedor, setShowModalFornecedor] = useState(false);
  const [compras, setCompras] = useState<any[]>([]);
  const [vendas, setVendas] = useState<any[]>([]);
  const [estoqueTotal, setEstoqueTotal] = useState(0);
  const [estoquePorTipo, setEstoquePorTipo] = useState<{ tipo: string; quantidade: number }[]>([]);

  
  useEffect(() => {
    const carregarDados = async () => {
      const { total, porTipo } = await getEstoqueResumo();
      const ultCompras = await getUltimasCompras();
      const ultVendas = await getUltimasVendas();

      setEstoqueTotal(total);
      setEstoquePorTipo(porTipo);
      setCompras(ultCompras);
      setVendas(ultVendas);
    };

    carregarDados();
  }, []);
  
  const handleSaveFornecedor = (fornecedor: Fornecedor) => {
    console.log("Fornecedor salvo", fornecedor);
    setShowModalFornecedor(false);
  };

  return (
    <div className="dashboard">
        <h1 className='dashboard__welcome'>Bem-vindo(a), {sessionStorage.getItem('nome') }!</h1>
      <div className="dashboard__grid">
        <Card title="Resumo do Estoque" size="medium" className="card--center">
          <p><strong>Total de insumos em estoque:</strong> {estoqueTotal} itens</p>
          <GraficoInsumos data={estoquePorTipo} />
          <div style={{ textAlign: 'right', marginTop: '8px' }}>
            <Botao label="Ver mais" tipo="secondary" htmlType="button" onClick={() => navigate('/estoque')} />
          </div>
        </Card>

        <Card title="Últimas Compras" size="medium" className="card--center">
          {compras.length === 0 ? (
            <p>Nenhuma compra recente.</p>
          ) : (
            compras.slice(0, 5).map((compra, idx) => (
              <p key={idx}>
                {compra.formaPagamento} - R$ {compra.valorTotal.toFixed(2)}
              </p>
            ))
          )}
          {compras.length > 3 && <p>...</p>}
          <div style={{ textAlign: 'right', marginTop: '120px' }}>
            <Botao label="Ver mais" tipo="secondary" htmlType="button" onClick={() => navigate('/gestao-compras')} />
          </div>
        </Card>

        <Card title="Últimas Vendas" size="medium" className="card--center">
          {vendas.length === 0 ? (
            <p>Nenhuma venda recente.</p>
          ) : (
            vendas.slice(0, 5).map((venda, idx) => (
              <p key={idx}>
                {venda.formaPagamento} - R$ {venda.valorTotal.toFixed(2)}
              </p>
            ))
          )}
          {vendas.length > 3 && <p>...</p>}
          <div style={{ textAlign: 'right', marginTop: '120px' }}>
            <Botao label="Ver mais" tipo="secondary" htmlType="button" onClick={() => navigate('/gestao-vendas')} />
          </div>
        </Card>

        <Card 
          className="card--center"
          title={"Gerencie todos os seus clientes"}
          size="medium">
          <Botao 
          label='Acessar CRM'
          tipo='primary' 
          htmlType='button'
          onClick={() => navigate('/crm')}/>
        </Card>

        <Card 
          className="card--center"
          title={"Cadastro simples \n de Fornecedor"}
          size="medium">
          <Botao
            tipo="primary"
            label="Clique aqui"
            htmlType='button'
            onClick={() => setShowModalFornecedor(true)} />
        </Card>

        <Card 
          className="card--center"
          title={"Mantenha-se em dia com \na Vigilância Sanitária"}
          size="medium">
          <Botao
            tipo="primary" 
            label="Saiba Mais"
            htmlType='button'
            onClick={() => setShowPopup(true)} />
        </Card>

      </div>
        {showModalFornecedor && (
        <ModalFornecedor
          onClose={() => setShowModalFornecedor(false)}
          onSave={handleSaveFornecedor}
        />
      )}

      {showPopup && <PopupVigilancia onClose={() => setShowPopup(false)} />}
    </div>
  )
}