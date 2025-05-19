// App.tsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";

import SelecaoProdutoPage   from "./pages/SelecaoProdutoPage";
import GestaoLeitePage      from "./pages/GestaoLeitePage";
import GestaoLaticinioPage  from "./pages/GestaoLaticinioPage";
import HistoricoPage        from "./pages/HistoricoPage";
import LoginPage            from "./pages/LoginPage";

function LayoutWithHeader(): React.ReactElement {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<LayoutWithHeader />}>
        <Route path="/selecionar-produto"  element={<SelecaoProdutoPage />} />
        <Route path="/gerenciar-leite"     element={<GestaoLeitePage />} />
        <Route path="/gerenciar-laticinio" element={<GestaoLaticinioPage />} />
        <Route path="/historico"           element={<HistoricoPage />} />
        <Route index                       element={<SelecaoProdutoPage />} />
      </Route>
      <Route path="/login"  element={<LoginPage />} />
    </Routes>
  );
}
