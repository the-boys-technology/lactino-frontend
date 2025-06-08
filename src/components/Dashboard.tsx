import { useState } from 'react'
import Header from './Header'
import Card from './Card'
import '../css/dashboard.css'
import Botao from '../components/Botao'
import PopupVigilancia from '../features/Home/PopUpVigilancia/PopupVigilancia'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false)
  
  return (
    <div className="dashboard">
        <h1 className='dashboard__welcome'>Bem-vindo(a), Fulano!</h1>
      <div className="dashboard__grid">
        <Card title="A Receber" value="R$ 2.460,00" type='inflow' size='medium'>
          <Botao label='Novo Recebimento' tipo='primary' htmlType='button'/>
        </Card>

        <Card title="A Pagar" value="R$ 3.276,00" type='outflow' size='medium'>
          <Botao label='Novo Pagamento' tipo='primary' htmlType='button'/>
        </Card>

        <Card title="A Vencer">
          <p><strong>Nos próximos dias:</strong><br />
            Leite (Lote LT-20250421) – vence em 1 dia
          </p>
          <p><strong>Nas próximas semanas:</strong><br />
            Queijo Coalho: vence em 12 dias<br />
            Lote LT-20250422-B: 18 dias
          </p>
        </Card>

        <Card title="Resumo diário da produção" size='large'>
          <p><strong>Leite recebido hoje:</strong> 1.250 L</p>
          <p><strong>Produção:</strong><br />
            Queijo Coalho: 320 kg (3 lotes)<br />
            Queijo Manteiga: 185 kg (2 lotes)<br />
            Ricota: 110 kg (1 lote)
          </p>
        </Card>

        <Card title="Gerencie seus clientes">
          <Botao 
          label='Acessar CRM'
          tipo='primary' 
          htmlType='button'
          onClick={() => navigate('/crm')}/>
        </Card>

        <Card 
          size='medium'
          className="card--center"
          title={"Mantenha-se em dia com \na Vigilância Sanitária"}>
          <Botao
            tipo="primary" 
            label="Saiba Mais"
            htmlType='button'
            onClick={() => setShowPopup(true)} />
        </Card>

      </div>
      {showPopup && <PopupVigilancia onClose={() => setShowPopup(false)} />}
    </div>
  )
}