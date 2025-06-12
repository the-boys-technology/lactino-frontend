import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SelecaoProdutoPage from '../pages/GestaoLeiteLaticinio/SelecaoProdutoPage';
import GestaoLeitePage from '../pages/GestaoLeiteLaticinio/GestaoLeitePage';
import GestaoLaticinioPage from '../pages/GestaoLeiteLaticinio/GestaoLaticinioPage';
import GestaoCompras from '../pages/GestaoCompras/GestaoCompras';
import GerenciamentoEstoque from '../pages/GerenciamentoEstoque/GerenciamentoEstoque';
import HistoricoPage from '../pages/GestaoLeiteLaticinio/HistoricoPage';
import GestaoVendas from '../pages/GestaoVendas/GestaoVendas';
import LoginPage from '../pages/Auth/LoginPage';
import CadastroPage from '../pages/Auth/CadastroPage';

import Header from '../components/Header';
import CRMPage from '../pages/CRMPage';
import { NotificacoesProvider } from '../context/NotificacoesContext';

function LayoutWithHeader(): React.ReactElement {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function AppRoutes(): React.ReactElement {
  return (
    <NotificacoesProvider>
      <BrowserRouter>
        <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/gestao-vendas" element={<GestaoVendas />} />
          <Route path="/gestao-compras" element={<GestaoCompras />} />
          <Route path="/estoque" element={<GerenciamentoEstoque />} />
          <Route path="/selecionar-produto" element={<SelecaoProdutoPage />} />
          <Route path="/gerenciar-leite" element={<GestaoLeitePage />} />
          <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
          <Route path="/crm" element={<CRMPage />}/>
          <Route path="/historico" element={<HistoricoPage />} />
          <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
        </Routes>
      </BrowserRouter>
    </NotificacoesProvider>
  );
}
