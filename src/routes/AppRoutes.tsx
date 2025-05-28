// AppRoutes.tsx
import { Routes, Route, Outlet } from 'react-router-dom';
import SelecaoProdutoPage from '../pages/SelecaoProdutoPage';
import GestaoLeitePage    from '../pages/GestaoLeitePage';
import GestaoLaticinioPage from '../pages/GestaoLaticinioPage';
import HistoricoPage      from '../pages/HistoricoPage';
import LoginPage          from '../pages/LoginPage';
import CadastroPage       from '../pages/CadastroPage';
import Header             from '../components/Header';

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutWithHeader />}>
        <Route index element={<SelecaoProdutoPage />} />
        <Route path="selecionar-produto"  element={<SelecaoProdutoPage />} />
        <Route path="gerenciar-leite"     element={<GestaoLeitePage />} />
        <Route path="gerenciar-laticinio" element={<GestaoLaticinioPage />} />
        <Route path="historico"           element={<HistoricoPage />} />
      </Route>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
    </Routes>
  );
}
