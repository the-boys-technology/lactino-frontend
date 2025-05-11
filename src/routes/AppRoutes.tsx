import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import SelecaoProdutoPage from '../pages/SelecaoProdutoPage';
import GestaoLeitePage from '../pages/GestaoLeitePage';
import GestaoLaticinioPage from '../pages/GestaoLaticinioPage';
import GestaoCompras from '../pages/GestaoCompras/GestaoCompras';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestao-compras" element={<GestaoCompras />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/selecionar-produto" element={<SelecaoProdutoPage />} />
        <Route path="/gerenciar-leite" element={<GestaoLeitePage />} />
        <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
