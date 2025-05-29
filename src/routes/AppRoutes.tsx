import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import { ProtectedRoute } from './ProtectedRoute';

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



function LayoutWithHeader(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* pass the toggle callback into your existing Header */}
      <Header onMenuClick={() => setSidebarOpen(o => !o)} />

      {/* shows/hides the sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* your routed pages live here; shifts right when open */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default function AppRoutes(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}> 
          <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/gestao-vendas" element={<GestaoVendas />} />
            <Route path="/gestao-compras" element={<GestaoCompras />} />
            <Route path="/estoque" element={<GerenciamentoEstoque />} />
            <Route path="/selecionar-produto" element={<SelecaoProdutoPage />} />
            <Route path="/gerenciar-leite" element={<GestaoLeitePage />} />
            <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
            <Route path="/historico" element={<HistoricoPage />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </BrowserRouter>
  );
}
