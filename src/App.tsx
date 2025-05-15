import React from 'react';
import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';
import SelecaoProdutoPage from './pages/SelecaoProdutoPage';
import GestaoLeitePage from './pages/GestaoLeitePage';
import GestaoLaticinioPage from './pages/GestaoLaticinioPage';
import HistoricoPage from './pages/HistoricoPage';

function App(): React.ReactElement {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/selecionar-produto" element={<SelecaoProdutoPage />} />
        <Route path="/gerenciar-leite" element={<GestaoLeitePage />} />
        <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
      </Routes>
    </>
  );
}

export default App;
