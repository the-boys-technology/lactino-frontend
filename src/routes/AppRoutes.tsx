import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';

import { Home } from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SelecaoProdutoPage from '../pages/SelecaoProdutoPage';
import GestaoLeitePage from '../pages/GestaoLeitePage';
import GestaoLaticinioPage from '../pages/GestaoLaticinioPage';
import GestaoCompras from '../pages/GestaoCompras/GestaoCompras';
import GerenciamentoEstoque from '../pages/GerenciamentoEstoque/GerenciamentoEstoque';
import HistoricoPage from '../pages/HistoricoPage';
import GestaoVendas from '../pages/GestaoVendas/GestaoVendas';
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';

import Header from '../components/Header';

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
    <BrowserRouter>
      <Routes>
      {/* Rotas com Header */}
      <Route element={<LayoutWithHeader />}>
        <Route path="/" element={<Home />} />
        <Route path="/gestao-vendas" element={<GestaoVendas />} />
        <Route path="/gestao-compras" element={<GestaoCompras />} />
        <Route path="/estoque" element={<GerenciamentoEstoque />} />
        <Route path="/selecionar-produto" element={<SelecaoProdutoPage />} />
        <Route path="/gerenciar-leite" element={<GestaoLeitePage />} />
        <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rotas sem Header */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </BrowserRouter>
  );
}
