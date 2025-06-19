import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/SideBarPerfil';
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
import NovaSenhaSidebar from '../components/NovaSenhaSideBar';



function LayoutWithHeader(): React.ReactElement {
  // “sidebarOpen” controla se ao menos UM sidebar está visível.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // “showReset” diz se é o ResetPasswordSidebar (true) ou o ProfileSidebar (false)
  const [showReset, setShowReset] = useState(false);

  // Quando o usuário clica no ícone de menu (hambúrguer) no <Header>:
  const handleMenuClick = () => {
    // sempre que abrirmos pelo ícone, mostre o perfil (não o de senha)
    setShowReset(false);
    setSidebarOpen(prev => !prev); // toggle
  };

  // Passamos isso para o <Sidebar> (perfil):
  const handleResetClick = () => {
    // em vez de fechar, abrimos o outro
    setShowReset(true);
    setSidebarOpen(true);
  };

  // Na ResetPasswordSidebar, “Retornar” volta ao perfil
  const handleBackToProfile = () => {
    setShowReset(false);
    setSidebarOpen(true); 
  };

  // Para ambos, no botão de “fechar” ou clicando no backdrop:
  const handleCloseAll = () => {
    setSidebarOpen(false);
    // se quiser, você pode zerar showReset também:
    // setShowReset(false);
  };

  return (
    <>
      {/* pass the toggle callback into your existing Header */}
      <Header onMenuClick={() => setSidebarOpen(o => !o)} />

      {/* shows/hides the sidebar */}
      {/* Se showReset for false, renderize o Profile Sidebar */}
      {!showReset && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleCloseAll}
          onReset={handleResetClick}
        />
      )}

      {/* Se showReset for true, renderize o ResetPasswordSidebar */}
      {showReset && (
        <NovaSenhaSidebar
          open={sidebarOpen}
          onClose={handleCloseAll}
          onBack={handleBackToProfile}
        />
      )}

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
